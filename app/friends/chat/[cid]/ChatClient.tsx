'use client'

import { Chat } from "../../data/chats";

interface ChatClientProps {
  chat: Chat;
}

export default function ChatClient({ chat }: ChatClientProps) {
  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Chat with {chat.name}</h1>
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <p className="text-gray-600">Last message: {chat.mess}</p>
        <p className="text-sm text-gray-500">Time: {chat.time}</p>
      </div>
      
      <div className="mt-8">
        <p className="text-gray-500">Chat messages will appear here...</p>
        {/* Add interactive chat components here later */}
      </div>
    </div>
  );
}