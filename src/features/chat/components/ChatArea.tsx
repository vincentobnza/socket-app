import { useRef, useEffect } from 'react';
import type { Message } from '../types/message.types';
import EmptyChatImage from '@/assets/empty_state.png';


interface ChatAreaProps {
  messages: Message[];
}

export function ChatArea({ messages }: ChatAreaProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto rounded-lg bg-neutral-900/50 p-3 space-y-3 mb-4">
      {messages.length === 0 ? (
        <div className="min-h-[calc(100%-100px)] flex flex-col items-center justify-center">
          <img src={EmptyChatImage} alt="Empty Chat" className="size-18 grayscale opacity-50 object-contain" />
          <p className="text-neutral-500 text-sm md:text-base  text-center font-semibold py-8">
            No messages yet. Say something!
          </p>
        </div>
      ) : (
        messages.map((msg) =>
          msg.sender === 'system' ? (
            <div key={msg.id} className="flex justify-center py-1">
              <p className="text-sm text-muted-foreground italic font-semibold">
                {msg.text}
              </p>
            </div>
          ) : (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 ${msg.sender === 'me'
                  ? 'bg-primary rounded-br-md'
                  : 'bg-neutral-700 rounded-bl-md'
                  }`}
              >
                <p className="text-sm wrap-break-word font-semibold">{msg.text}</p>
                <p className="text-xs opacity-50 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          )
        )
      )}
      <div ref={endRef} />
    </div>
  );
}
