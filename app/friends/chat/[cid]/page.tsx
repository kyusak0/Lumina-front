'use client'

import { useParams } from "next/navigation";
import { Chat, chats } from "../../data/chats";

export default function ChatPage() {
    const params = useParams();
    const { cid } = params;

    const chatId = parseInt(cid as string, 10);
    const chat = chats.find((c: Chat) => c.id === chatId);

    return (
        <><div className="flex g-4">
            <div>
                {chats.map((chat: Chat) => (
                    <div key={chat.id} className="">
                        {chat.name}
                    </div>
                ))}
            </div>
            <div>
                <h1>Chat: {cid}</h1>
                <p>Friend: {chat.name}</p>
                <p>Last message: {chat.mess}</p>
                <p>Time: {chat.time}</p>
            </div>
        </div>
        </>
    )
}

