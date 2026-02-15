interface TypingIndicatorProps {
  show?: boolean;
}

export function TypingIndicator({ show = true }: TypingIndicatorProps) {
  if (!show) return null;

  return (
    <div className="flex justify-center py-2 shrink-0">
      <div
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-600/50 px-4 py-2"
        aria-label="Someone is typing"
      >
        <span
          className="size-2 rounded-full bg-neutral-400 animate-typing-bounce [animation-delay:0ms]"
        />
        <span
          className="size-2 rounded-full bg-neutral-400 animate-typing-bounce [animation-delay:350ms]"
        />
        <span
          className="size-2 rounded-full bg-neutral-400 animate-typing-bounce [animation-delay:700ms]"
        />
      </div>
    </div>
  );
}
