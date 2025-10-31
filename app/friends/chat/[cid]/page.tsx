'use client'

import { useParams } from "next/navigation";
import { Chat, chats } from "../../data/chats";
import Link from "next/link";

export default function ChatPage() {
    const params = useParams();
    const { cid } = params;

    const chatId = parseInt(cid as string, 10);
    const chat = chats.find((c: Chat) => c.id === chatId);

    // Handle case where chat is not found
    if (!chat) {
        return (
            <div className="p-4">
                <h1>Chat not found</h1>
                <p>No chat exists with ID: {cid}</p>
            </div>
        );
    }

    return (
        <>
        <div className="flex gap-4 p-4">

            <div className="w-1/4 border-r pr-4">
                <h2 className="text-lg font-bold mb-4">Friends</h2>
                {chats.map((chatItem: Chat) => (
                    <div 
                        key={chatItem.id} 
                        className={`p-3 mb-2 rounded cursor-pointer ${
                            chatItem.id === chatId 
                                ? 'bg-blue-100 border border-blue-300' 
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        <Link href={`/friends/chat/${chat.id}`}>
                            {chatItem.name}
                        </Link>
                    </div>
                ))}
            </div>
            
            {/* Chat Area */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold mb-4">Chat with {chat.name}</h1>
                <div className="mb-4 p-4 bg-gray-50 rounded">
                    <p className="text-gray-600">Last message: {chat.mess}</p>
                    <p className="text-sm text-gray-500">Time: {chat.time}</p>
                </div>
                
                {/* Add chat messages and input here later */}
                <div className="mt-8">
                    <p className="text-gray-500">Chat messages will appear here...</p>
                </div>
            </div>
        </div>
        </>
    )
}
