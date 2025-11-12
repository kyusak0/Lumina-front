'use client'

import React from "react";
import { Chat } from "./chats";
import { messTime } from "@/app/utils/setTime";
import { refresh } from "next/cache";

interface ChatClientProps {
  chat: Chat;
}

export default function ChatClient({ chat }: ChatClientProps) {
  const sendMess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let messElement = document.getElementById('messField') as HTMLInputElement;
    let mess = messElement ? messElement.value : null;
    const textMess = mess || '12';
    chat.messages.push({
      id: chat.messages.length,
      mess: textMess,
      timestamp: messTime(new Date()),
    });
    messElement.value = '';
    return;
   
  }

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Chat with {chat.name}</h1>
      <div className="mb-4 p-4 bg-gray-50 rounded">
        {
          chat.messages.map(message => (
            <div className="rounded" key={message.id}>
              <p className="text-gray-600">Message: {message.mess}</p>
              <p className="text-sm text-gray-500" > Time: {message.timestamp}</p>
            </div>
          ))}
        <div className="mt-8">
          <form action="" method="get" className="flex justify-between sendForm" onSubmit={sendMess}>
            {/* get csrf token */}
            <input type="hidden" name="chat_id" value={chat.id} />
            <input type="text" className="text-gray-500 flex-1 p-5" name="mess" id="messField" placeholder="Chat messages will appear here..." />
            <button type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </div >
  );
}