import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { CreateRoomInput } from '../types/room.types'
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react'

type NewRoomFormProps = {
  onSubmit: (data: CreateRoomInput) => void
  isSubmitting?: boolean
}

const PRIVACY_OPTIONS: { value: CreateRoomInput['privacyType']; label: string; icon: typeof LockKeyholeOpen }[] = [
  { value: 'public', label: 'Public', icon: LockKeyholeOpen },
  { value: 'private', label: 'Private', icon: LockKeyhole },
]

const initialValues: CreateRoomInput = {
  title: '',
  description: '',
  privacyType: 'public',
}

export function NewRoomForm({ onSubmit, isSubmitting = false }: NewRoomFormProps) {
  const [values, setValues] = useState<CreateRoomInput>(initialValues)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.title.trim()) return
    onSubmit(values)
  }

  const update = (field: keyof CreateRoomInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = e.target.value
    setValues((prev) => ({ ...prev, [field]: next }))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="room-title" className="text-sm font-medium">
          Room name
        </label>
        <Input
          id="room-title"
          placeholder="e.g. Family Chat"
          value={values.title}
          onChange={update('title')}
          required
          autoFocus
          className='h-12'
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="room-description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="room-description"
          placeholder="What's this room about?"
          value={values.description}
          onChange={update('description')}
          rows={3}
          className={cn(
            'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs',
            'placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Privacy</span>
        <div className="flex gap-2">
          {PRIVACY_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValues((prev) => ({ ...prev, privacyType: value }))}
              className={cn(
                'inline-flex items-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium transition-colors',
                values.privacyType === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-input bg-transparent text-muted-foreground hover:border-primary/50'
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-fit" disabled={!values.title.trim() || isSubmitting}>
        {isSubmitting ? 'Creating…' : 'Create room'}
      </Button>
    </form>
  )
}
