import { create } from 'zustand'
import io, { type Socket } from 'socket.io-client'
import { SOCKET_EVENTS } from '@/config/constants'
import type { Message } from '../types/message.types'

import chatSoundUrl from '@/assets/music/chat_sound.mp3'
import leaveChatSoundUrl from '@/assets/music/leave_chat.mp3'

function playChatSound() {
  const audio = new Audio(chatSoundUrl)
  audio.play().catch(() => { })
}

function playLeaveChatSound() {
  const audio = new Audio(leaveChatSoundUrl)
  audio.play().catch(() => { })
}


type ChatState = {
  socket: Socket | null
  mySocketId: string | null
  currentRoomId: string | null
  messages: Message[]
  isConnected: boolean
  userCount: number
  typingUserIds: Set<string>
}

type ChatActions = {
  initSocket: () => void
  joinRoom: (roomId: string) => void
  leaveRoom: () => void
  sendMessage: (text: string) => void
  setUserCount: (count: number) => void
  clearMessages: () => void
  reset: () => void
  emitTyping: () => void
  emitStoppedTyping: () => void
}

const initialState: ChatState = {
  socket: null,
  mySocketId: null,
  currentRoomId: null,
  messages: [],
  isConnected: false,
  userCount: 0,
  typingUserIds: new Set(),
}

function createMessage(text: string, sender: Message['sender']): Message {
  return {
    id: crypto.randomUUID(),
    text,
    sender,
    timestamp: new Date(),
  }
}

export const useChatStore = create<ChatState & ChatActions>((set, get) => ({
  ...initialState,

  initSocket() {
    const socket = get().socket
    if (socket) return

    const s = io()
    set({ socket: s })

    s.on(SOCKET_EVENTS.CONNECT, () => {
      const id = s.id
      set({ isConnected: true, mySocketId: id ?? null })
    })

    s.on(SOCKET_EVENTS.DISCONNECT, () => set({ isConnected: false }))

    s.on(SOCKET_EVENTS.RECEIVE_MESSAGE, (payload: { text: string; senderId: string }) => {
      const { currentRoomId, mySocketId } = get()
      if (!currentRoomId) return
      if (payload.senderId === mySocketId) return
      playChatSound()
      set((state) => ({
        messages: [...state.messages, createMessage(payload.text, 'them')],
      }))
    })

    s.on(SOCKET_EVENTS.USER_JOINED, (_payload: { userId: string }) => {
      const { currentRoomId, mySocketId } = get()
      if (!currentRoomId) return
      if (_payload.userId === mySocketId) return
      set((state) => ({
        messages: [
          ...state.messages,
          createMessage('A user joined the room', 'system'),
        ],
      }))
    })

    s.on(SOCKET_EVENTS.USER_LEFT, (payload: { userId: string }) => {
      const { currentRoomId, mySocketId } = get()
      if (!currentRoomId) return
      if (payload.userId === mySocketId) return
      playLeaveChatSound()
      set((state) => {
        const nextTyping = new Set(state.typingUserIds)
        nextTyping.delete(payload.userId)
        return {
          messages: [
            ...state.messages,
            createMessage('A user left the room', 'system'),
          ],
          typingUserIds: nextTyping,
        }
      })
    })

    s.on(SOCKET_EVENTS.ROOM_USER_COUNT, (count: number) => {
      set({ userCount: count })
    })

    s.on(SOCKET_EVENTS.USER_IS_TYPING, (payload: { userId: string }) => {
      const { currentRoomId, mySocketId } = get()
      if (!currentRoomId || payload.userId === mySocketId) return
      set((state) => ({
        typingUserIds: new Set(state.typingUserIds).add(payload.userId),
      }))
    })

    s.on(SOCKET_EVENTS.USER_STOPPED_TYPING, (payload: { userId: string }) => {
      const { mySocketId } = get()
      if (payload.userId === mySocketId) return
      set((state) => {
        const next = new Set(state.typingUserIds)
        next.delete(payload.userId)
        return { typingUserIds: next }
      })
    })
  },

  joinRoom(roomId: string) {
    const { socket, currentRoomId } = get()
    if (currentRoomId === roomId) return
    set({
      currentRoomId: roomId,
      messages: [],
      userCount: 0,
    })
    if (socket) {
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, roomId)
    }
  },

  leaveRoom() {
    const { socket, currentRoomId } = get()
    if (socket && currentRoomId) {
      socket.emit(SOCKET_EVENTS.LEAVE_ROOM)
    }
    set({ currentRoomId: null, messages: [], userCount: 0, typingUserIds: new Set() })
  },

  emitTyping() {
    const { socket, currentRoomId } = get()
    if (socket && currentRoomId) {
      socket.emit(SOCKET_EVENTS.USER_IS_TYPING, currentRoomId)
    }
  },

  emitStoppedTyping() {
    const { socket, currentRoomId } = get()
    if (socket && currentRoomId) {
      socket.emit(SOCKET_EVENTS.USER_STOPPED_TYPING, currentRoomId)
    }
  },

  sendMessage(text: string) {
    set((state) => ({
      messages: [...state.messages, createMessage(text, 'me')],
    }))
    const { socket, currentRoomId } = get()
    if (socket && currentRoomId) {
      socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { roomId: currentRoomId, text })
    }
  },

  setUserCount(count: number) {
    set({ userCount: count })
  },

  clearMessages() {
    set({ messages: [] })
  },

  reset() {
    get().leaveRoom()
    set(initialState)
  },
}))
