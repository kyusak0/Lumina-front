'use client'

import Link from "next/link";
import MainLayout from "../layouts/mainLayout"

import { chats, Chat } from "./data/chats";
import ChatClient from "./data/ChatClient";
import { useState } from "react";

export default function Friends() {

    const [chatId, setChatId] = useState(0);

    const chatSelect = (id: number) => {
        setChatId(id-1);
    }
    return (
        <>
            <MainLayout>
                <div className="flex gap-4 p-4">
                    <div className="w-1/4 border-r pr-4">
                        <h2 className="text-lg font-bold mb-4">Friends</h2>
                        {chats.map((chatItem: Chat) => (
                            <div key={chatItem.id}>


                                <button
                                    onClick={()=>chatSelect(chatItem.id)}
                                    className={`block p-3 mb-2 rounded cursor-pointer ${chatItem.id-1 === chatId
                                        ? 'bg-blue-100 border border-blue-300'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    {chatItem.name}
                                </button>
                            </div>
                        ))}
                    </div>
                    <ChatClient chat={chats[chatId]} /></div>

            </MainLayout>

        </>
    )
}