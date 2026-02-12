import type React from "react"
import { cn } from "@/lib/utils"
type TitleProps = {
    children: React.ReactNode,
    className?: string
}
export function Title({ children, className }: TitleProps) {
    return (
        <h1 className={cn("text-base md:text-xl lg:text-2xl font-bold", className)}>
            {children}
        </h1>
    )
}