import { JoinRoomBanner } from '../components/JoinRoomBanner'
import { RoomList } from '../components/RoomList'

export function HomePage() {
  return (
    <div className="bg-background min-h-screen flex flex-col w-full max-w-7xl mx-auto space-y-4 p-4 md:p-5 lg:p-10 tracking-tight">
      <JoinRoomBanner />
      <RoomList />
    </div>
  )
}
