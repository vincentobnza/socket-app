interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function ChatInput({ value, onChange, onSend, onKeyDown }: ChatInputProps) {
  return (
    <div className="flex gap-2 shrink-0 p-5 border-t border-border">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        className="flex-1 rounded-lg bg-neutral-800/50 border border-input px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={!value.trim()}
        className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-800 transition-colors"
      >
        Send
      </button>
    </div>
  );
}
