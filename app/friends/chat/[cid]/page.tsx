'use client'

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ChatClient from "./ChatClient";
import Link from "next/link";
import { getAllChats } from "@/app/utils/api";

interface Chat {
  id: number;
  name: string;
  mess: string;
  time: string;
}

export default function ChatPage() {
  const params = useParams();
  const cid = params.cid as string;
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  const chatId = parseInt(cid, 10);
  const chat = chats.find((c: Chat) => c.id === chatId);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getAllChats();
        setChats(data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!chat) {
    return (
      <div className="p-4">
        <h1>Chat not found</h1>
        <p>No chat exists with ID: {cid}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4">
      {/* Friends List Sidebar */}
      <div className="w-1/4 border-r pr-4">
        <h2 className="text-lg font-bold mb-4">Friends</h2>
        {chats.map((chatItem: Chat) => (
          <Link 
            key={chatItem.id}
            href={`/friends/chat/${chatItem.id}`}
            className={`block p-3 mb-2 rounded cursor-pointer ${
              chatItem.id === chatId
                ? 'bg-blue-100 border border-blue-300'
                : 'hover:bg-gray-100'
            }`}
          >
            {chatItem.name}
          </Link>
        ))}
      </div>

      <ChatClient chat={chat} />
    </div>
  );
}
