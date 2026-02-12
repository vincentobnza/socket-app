import type { Room } from '../types/room.types'

export const dummyRooms: Room[] = [
  {
    id: '1',
    title: 'General',
    description: 'General chat for everyone. Say hi and meet new people.',
    memberCount: 24,
    messageCount: 1842,
    privacyType: 'public',
  },
  {
    id: '2',
    title: 'Random',
    description: 'Random thoughts, memes, and off-topic banter.',
    memberCount: 12,
    messageCount: 3201,
    privacyType: 'public',
  },
  {
    id: '3',
    title: 'Gaming',
    description: 'Find squad mates and share your best clips.',
    memberCount: 31,
    messageCount: 4203,
    privacyType: 'public',
  },
  {
    id: '4',
    title: 'Music & Art',
    description: 'Share your creations and discover new artists.',
    memberCount: 15,
    messageCount: 892,
    privacyType: 'private',
    isMine: true,
  },
]
