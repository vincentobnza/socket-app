import { Paragraph, Title } from '@/shared/components/typography'
import { ArrowLeft, UsersIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type ChatHeaderProps = {
  roomTitle: string
  users: number
  isConnected?: boolean
}

export function ChatHeader({ roomTitle, users, isConnected = false }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between shrink-0 p-5 border-b-2 border-border">
      <div className="flex items-center gap-x-2 md:gap-x-4 lg:gap-x-6">
        <Link to="/" className="flex items-center gap-2 text-sm text-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <Title>
          {roomTitle}
        </Title>
      </div>
      <div className="flex items-center gap-2">
        {isConnected && (
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
            <Paragraph className="text-sm text-muted-foreground">{users}</Paragraph>
            <UsersIcon className="size-4 text-muted-foreground" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  )
}
