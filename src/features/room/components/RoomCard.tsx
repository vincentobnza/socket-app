import { Title, Paragraph } from '@/shared/components/typography'
import { cn } from '@/lib/utils'
import type { Room } from '../types/room.types'
import { getInitials } from '../utils'
import { Button } from '@/components/ui/button'
import { MessageCircle, Users, LockKeyhole, LockKeyholeOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'




type RoomCardProps = {
    room: Room
    className?: string
}

export function RoomCard({ room, className }: RoomCardProps) {
    const { title, description, memberCount, messageCount, privacyType = 'public' } = room
    const navigate = useNavigate()
    const handleJoinRoom = () => {
        navigate(`/chat/${room.id}`)
    }

    return (
        <article
            className={cn(
                'group w-full flex justify-between items-center rounded-xl border border-border/50 bg-card p-4 transition-colors',
                ' hover:bg-card/80',
                className
            )}
        >
            <div className="flex gap-4">
                <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm! font-bold text-primary"
                    aria-hidden
                >
                    {getInitials(title)}
                </div>
                <div className="min-w-0 flex-1">
                    <Title className="mb-1 truncate text-base! font-medium">
                        {title}
                    </Title>
                    <Paragraph className="text-sm! mb-3 line-clamp-2 text-muted-foreground">
                        {description}
                    </Paragraph>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Users className="size-3.5 shrink-0" aria-hidden />
                            <span>{memberCount} online</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MessageCircle className="size-3.5 shrink-0" aria-hidden />
                            <span>{messageCount.toLocaleString()} messages</span>
                        </span>
                    </div>
                </div>
            </div>
            <Button variant="secondary" onClick={handleJoinRoom}>
                {
                    privacyType === 'public' ? <LockKeyholeOpen className="size-4" /> : <LockKeyhole className="size-4" />
                }
                Join Room
            </Button>
        </article>
    )
}
