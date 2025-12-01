'use client'

import MainLayout from "../layouts/mainLayout"

import api, { getCSRF } from "../_api/api";
import { useState, useEffect } from "react";
import Link from "next/link";


export interface Chat {
    id: number,
    name: string,
    creator_id: number
}

export default function Friends() {

    const [senderId, setSenderId] = useState(0);
    const [chatId, setChatId] = useState(0);
    const [chatName, setChatName] = useState("new chat");

    const chatSelect = (id: number) => {
        if (!id) {
            return;
        }
        setChatId(id - 1);
    }

    // const deleteChat = (id: number) => {
    //     if (!id) {
    //         return;
    //     }
    //     chats.splice(id - 1, 1);
    //     chatSelect(id);
    // }

    const checkUser = async () => {
        try {
            await getCSRF();
            const res = await api.post("/checkSender");
            const user_id = res.data.sender_id;
            setSenderId(user_id);
            return user_id;
        } catch (error) {
            console.log('Error in checkUser:', error);
            return 0;
        }
    }

    const newChatName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newNameField = document.querySelector('#chatName') as HTMLInputElement;
        const newName = newNameField?.value;

        // id: newChatId,
        //     chat_name: newName.toString() || 'new user',
        //         creator_id: user_id,

        //             newNameField.value = '';

        try {
            await getCSRF();
            const res = await api.post("/createChat", {
                creator_id: senderId,
                name: chatName,
            });

            console.log("Message sent successfully:", res.data.mess);


            const chatData = {
                type: 'new_chat',
                chat: {
                    id: res.data.message_id,
                    name: res.data.name,
                    creator_id: senderId,
                    created_at: new Date().toISOString()
                }
            };

        } catch (err: any) {
            alert(err.response?.data?.message || "Error sending message");
        }
    }

    const [chats, setChats] = useState<Chat[]>([]);

    const showChats = async () => {
        const res = await api.post("/allChat");

        console.log("Message sent successfully:", res.data.mess);

        setChats(res.data.chats)
    }


    useEffect(() => {
        if (senderId > -1) {
            const interval = setInterval(() => {
                showChats();
            }, 5000); // Обновлять каждые 5 секунд, если вебсокет не работает корректно

            return () => clearInterval(interval);
        }
    }, [senderId]);


    return (
        <>
            <MainLayout>
                <div className="flex gap-4 p-4">
                    <div className="w-full border-r pr-4">
                        <h2 className="text-lg font-bold my-4">Friends</h2>
                        {chats.map((chat: Chat) => (
                            <Link
                                href={`friends/${chat.id}`}
                                key={chat.id}
                                onClick={() => chatSelect(chat.id)}
                                className={`block px-3 py-5 mb-2 rounded flex justify-between ${chat.id - 1 === chatId
                                    ? 'bg-blue-100 border border-blue-300'
                                    : 'hover:bg-gray-100'
                                    }`}
                            >
                                <button
                                >
                                    {chat.name}
                                </button>
                                <button
                                // onClick={() => deleteChat(chatItem.id)}
                                >delete</button>
                            </Link>
                        ))}

                        <form onSubmit={(event) => newChatName(event)}>
                            <input type="text" name="name" id="name" placeholder="name of chat" onChange={(e) => setChatName(e.target.value)} value={chatName} />
                            <input type="hidden" name="creator_id" value={senderId} />
                            <button type="submit">
                                new chat
                            </button></form>

                    </div>
                </div>
                <button
                    onClick={showChats}
                >
                    refresh
                </button>
            </MainLayout>

        </>
    )
}