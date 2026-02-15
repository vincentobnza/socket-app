import { useEffect } from 'react'

import loadingSoundUrl from '@/assets/music/loading_sound.mp3'

export function Loading() {
    useEffect(() => {
        const audio = new Audio(loadingSoundUrl)
        audio.play().catch(() => { })
        return () => {
            audio.pause()
            audio.currentTime = 0
        }
    }, [])

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/95 backdrop-blur-sm"
            aria-live="polite"
            aria-busy="true"
        >
            <p className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold animate-pulse text-muted-foreground">
                Joining room...
            </p>
        </div>
    )
}
