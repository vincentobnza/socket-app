export interface Room {
  id: string
  title: string
  description: string
  memberCount: number
  messageCount: number
  privacyType: 'public' | 'private'
  isMine?: boolean
}

export type CreateRoomInput = Pick<Room, 'title' | 'description' | 'privacyType'>
