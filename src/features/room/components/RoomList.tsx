import { useState, useMemo } from 'react'
import { Title, Paragraph } from '@/shared/components/typography'
import { RoomCard } from './RoomCard'
import { dummyRooms } from '../data/dummy-rooms'
import type { Room } from '../types/room.types'
import { cn } from '@/lib/utils'

type TabId = 'all' | 'public' | 'private' | 'mine'

const TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'public', label: 'Public' },
  { id: 'private', label: 'Private' },
  { id: 'mine', label: 'My Rooms' },
]

function filterRooms(rooms: Room[], tab: TabId): Room[] {
  switch (tab) {
    case 'public':
      return rooms.filter((r) => r.privacyType === 'public')
    case 'private':
      return rooms.filter((r) => r.privacyType === 'private')
    case 'mine':
      return rooms.filter((r) => r.isMine === true)
    default:
      return rooms
  }
}

export function RoomList() {
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const filteredRooms = useMemo(
    () => filterRooms(dummyRooms, activeTab),
    [activeTab]
  )

  return (
    <div className="w-full flex flex-col gap-y-2 p-2 md:p-4">
      <div className="flex flex-col">
        <Title className="text-xl md:text-2xl">Rooms</Title>
        <Paragraph className="mt-1 text-muted-foreground">
          Join a room to start chatting with your friends, family and colleagues.
        </Paragraph>
      </div>

      <div
        className="mt-4 flex gap-1 border-b-2 border-border"
        role="tablist"
        aria-label="Room filters"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-3 text-sm font-medium text-muted-foreground transition-colors',
              'hover:text-foreground',
              'border-b-2 -mb-px',
              activeTab === tab.id
                ? 'border-primary text-foreground'
                : 'border-transparent'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section
        className="mt-4 w-full space-y-3"
        aria-label="Available rooms"
        role="tabpanel"
      >
        {filteredRooms.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No rooms in this category.
          </p>
        ) : (
          filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))
        )}
      </section>
    </div>
  )
}
