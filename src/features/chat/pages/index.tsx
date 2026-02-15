import { ChatContainer } from '../components/ChatContainer'
import { useParams, useLocation } from 'react-router-dom'

type LocationState = { room?: { title?: string } }

export default function ChatPage() {
  const { roomId } = useParams()
  const location = useLocation()
  const roomTitle = (location.state as LocationState)?.room?.title

  if (!roomId) return null
  return <ChatContainer roomId={roomId} roomTitle={roomTitle} />
}
