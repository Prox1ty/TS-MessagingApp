import {type Message } from "../types";

interface ChatBubbleProps {
    message: Message // change this to be an object later
    isOwn: boolean
}

export default function ChatBubble({ message, isOwn }: ChatBubbleProps) {
  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} mb-3`}>
      <span className="text-[11px] text-zinc-400 font-mono mb-1 px-1">
        {isOwn ? 'You' : message.sender} • {message.timestamp}
      </span>
      <div
        className={`max-w-[75%] md:max-w-[60%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-sm ${
          isOwn
            ? 'bg-blue-600 text-white rounded-br-xs'
            : 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 rounded-bl-xs'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}