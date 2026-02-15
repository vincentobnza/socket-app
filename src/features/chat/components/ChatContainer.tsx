import { useEffect, useState, useRef, useCallback } from 'react'
import { useChatStore } from '../store/use-chat-store'
import { ChatHeader, ChatArea, ChatInput, TypingIndicator } from './index'
import { Loading } from '@/features/room/components/Loading'

const LOADING_MIN_MS = 5000
const TYPING_STOPPED_DEBOUNCE_MS = 1500

type ChatContainerProps = {
  roomId: string
  roomTitle?: string
}

export function ChatContainer({ roomId, roomTitle = 'Chat' }: ChatContainerProps) {
  const [inputValue, setInputValue] = useState('')
  const [showChat, setShowChat] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const messages = useChatStore((state) => state.messages)
  const sendMessage = useChatStore((state) => state.sendMessage)
  const initSocket = useChatStore((state) => state.initSocket)
  const joinRoom = useChatStore((state) => state.joinRoom)
  const leaveRoom = useChatStore((state) => state.leaveRoom)
  const isConnected = useChatStore((state) => state.isConnected)
  const currentRoomId = useChatStore((state) => state.currentRoomId)
  const userCount = useChatStore((state) => state.userCount)
  const typingUserIds = useChatStore((state) => state.typingUserIds)
  const emitTyping = useChatStore((state) => state.emitTyping)
  const emitStoppedTyping = useChatStore((state) => state.emitStoppedTyping)

  useEffect(() => {
    initSocket()
    joinRoom(roomId)
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }
      leaveRoom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when roomId changes
  }, [roomId])

  useEffect(() => {
    const ready = isConnected && currentRoomId === roomId
    if (!ready) {
      setShowChat(false)
      return
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setShowChat(true)
      timeoutRef.current = null
    }, LOADING_MIN_MS)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isConnected, currentRoomId, roomId])

  const handleSend = () => {
    if (!inputValue.trim()) return
    emitStoppedTyping()
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
    sendMessage(inputValue)
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value)
      emitTyping()
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        emitStoppedTyping()
        typingTimeoutRef.current = null
      }, TYPING_STOPPED_DEBOUNCE_MS)
    },
    [emitTyping, emitStoppedTyping]
  )

  if (!showChat) {
    return <Loading />
  }

  return (
    <div className="flex h-screen flex-col w-full max-w-5xl mx-auto bg-neutral-800/20">
      <ChatHeader roomTitle={roomTitle} users={userCount} isConnected={isConnected} />
      <ChatArea messages={messages} />
      <TypingIndicator show={typingUserIds.size > 0} />
      <ChatInput
        value={inputValue}
        onChange={handleInputChange}
        onSend={handleSend}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
