'use client'

import MainLayout from "../layouts/mainLayout"

import { chats, Chat } from "./data/chats";
import { messTime } from "../utils/setTime";
import ChatClient from "../components/ChatClient";
import { useState } from "react";

export default function Friends() {

    const [chatId, setChatId] = useState(0);

    const chatSelect = (id: number) => {
        setChatId(id - 1);
    }

    const newChatName = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const newNameField = document.querySelector('#chatName') as HTMLInputElement;
        const newName = newNameField?.value;

        const newChatId = chats.length + 1;
        chats.push({
            id: newChatId,
            name: newName.toString() || 'new user',
            messages: [{
                id: 0,
                mess: "новый чат с " + newName,
                timestamp: messTime(new Date()),
            }]
        });
        chatSelect(newChatId);
        newNameField.value = '';
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
                                    onClick={() => chatSelect(chatItem.id)}
                                    className={`block p-3 mb-2 rounded cursor-pointer ${chatItem.id - 1 === chatId
                                        ? 'bg-blue-100 border border-blue-300'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    {chatItem.name}
                                </button>
                            </div>
                        ))}
                        <form action="" onSubmit={(event) => newChatName(event)}>
                            <input type="text" name="chatName" id="chatName" placeholder="name of chat"/>
                            <button type="submit">
                                new chat
                            </button></form>

                    </div>
                    <ChatClient chat={chats[chatId]} /></div>

            </MainLayout>

        </>
    )
}