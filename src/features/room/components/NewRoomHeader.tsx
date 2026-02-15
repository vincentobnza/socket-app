import { Button } from '@/components/ui/button'
import { Title, Paragraph } from '@/shared/components/typography'
import { IoArrowBack } from 'react-icons/io5'

type NewRoomHeaderProps = {
  onBack: () => void
  title?: string
  description?: string
}

export function NewRoomHeader({
  onBack,
  title = 'Create a New Room',
  description = 'Create a new room to start chatting with your friends and family.',
}: NewRoomHeaderProps) {
  return (
    <header className="flex flex-col items-start">
      <Button variant="outline" size="sm" className="mb-10 gap-1.5 text-xs" onClick={onBack}>
        <IoArrowBack className="size-3" aria-hidden />
        Back
      </Button>
      <Title className="mb-1">{title}</Title>
      <Paragraph>{description}</Paragraph>
    </header>
  )
}
