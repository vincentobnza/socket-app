import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigateToPage } from '@/shared/hooks/useNavigateToPage'
import { NewRoomHeader, NewRoomForm } from '../components'
import type { CreateRoomInput } from '../types/room.types'

export default function NewRoom() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const navigateHome = useNavigateToPage({ path: '/' })

    const handleCreateRoom = (data: CreateRoomInput) => {
        setIsSubmitting(true)
        const roomId = crypto.randomUUID()
        navigate(`/chat/${roomId}`, { state: { room: { id: roomId, ...data } } })
        setIsSubmitting(false)
    }

    return (
        <div className="bg-background flex flex-col w-full mx-auto max-w-2xl">
            <main className="flex flex-col bg-card p-4 md:p-5 lg:p-10 min-h-screen">
                <NewRoomHeader onBack={navigateHome} />
                <NewRoomForm onSubmit={handleCreateRoom} isSubmitting={isSubmitting} />
            </main>
        </div>
    )
}
