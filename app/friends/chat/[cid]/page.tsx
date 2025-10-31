'use client'

import { useParams } from "next/navigation";
import { Chat, chats } from "../../data/chats";
import ChatClient from "./ChatClient";
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
        <div className="flex gap-4 p-4">
            {/* Friends List Sidebar */}
            <div className="w-1/4 border-r pr-4">
                <h2 className="text-lg font-bold mb-4">Friends</h2>
                {chats.map((chatItem: Chat) => (
                    <Link href={`${chatItem.id}`}>
                        <div
                            key={chatItem.id}
                            className={`p-3 mb-2 rounded cursor-pointer ${chatItem.id === chatId
                                    ? 'bg-blue-100 border border-blue-300'
                                    : 'hover:bg-gray-100'
                                }`}
                        >

                            {chatItem.name}


                        </div></Link>
                ))}
            </div>

            <ChatClient chat={chat} />

        </div>
    );
}