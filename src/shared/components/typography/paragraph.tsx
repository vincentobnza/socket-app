
import type React from "react"
import { cn } from "@/lib/utils"

type ParagraphProps = {
    children: React.ReactNode,
    className?: string
}
export function Paragraph({ children, className }: ParagraphProps) {
    return (
        <p className={cn("text-xs md:text-sm lg:text-base font-medium text-muted-foreground", className)}>
            {children}
        </p>
    )
}