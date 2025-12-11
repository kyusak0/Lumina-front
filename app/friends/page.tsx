'use client'

import MainLayout from "../layouts/mainLayout"
import { MouseEvent } from 'react';

import api, { getCSRF } from "../_api/api";
import { useState, useEffect } from "react";

import Link from "next/link";

import ChatWindow from './[cid]/page'


export interface Chat {
    id: number,
    name: string,
    creator_id: number
}

export default function Friends() {

    const [senderId, setSenderId] = useState(0);
    const [chatId, setChatId] = useState(0);
    const [isSelectedChat, setIsSelectedChat] = useState(false);
    const [chatName, setChatName] = useState("new chat");

    const chatSelect = (id: number) => {
        if (!id) {
            return;
        }
        setChatId(id - 1);
        setIsSelectedChat(true)
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
        const res = await api.get("/allChat");

        console.log("Message sent successfully:", res.data.mess);

        setChats(res.data.chats)
    }

    const [context, setContext] = useState<{
        mess_id: number,
        visible: boolean,
        x_position: number,
        y_position: number,
    }>({
        mess_id: 0,
        visible: false,
        x_position: 0,
        y_position: 0,
    });

    const openContextMenu = (event: MouseEvent<HTMLDivElement>, chat_id: number) => {
        event.preventDefault();
        console.log(event.type + "" + "" + chat_id);
        setContext({
            mess_id: chat_id,
            visible: true,
            x_position: event.clientX - 400,
            y_position: event.clientY - 150,
        });
    }


    useEffect(() => {
        if (senderId > -1) {
            const interval = setInterval(() => {
                showChats();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [senderId]);

    const [chatListWidth, setChatListWidth] = useState('w-2/4');
    // const [chatContentWidth, setChatContentWidth] = useState('w-2/4');

    const handleSelectWidth = (e: any) => {
        e.target.value == 'hide' ? hideChatList() : setChatListWidth(e.target.value);
        openPopUp();
    }

    const [chatList, setChatList] = useState<{
        visible: boolean,
        text: string,
    }>
        ({
            visible: true,
            text: 'hide',
        });

    const hideChatList = () => {
        setChatList({
            visible: !chatList.visible,
            text: chatList.visible ? 'Show' : 'hide',
        });
    }

    const [popUpOpen, setPopUpOpen] = useState(false);

    const openPopUp = () => {
        setPopUpOpen(!popUpOpen);
    }

    return (
        <MainLayout>
            <div className="w-full flex justify-between">
                <button className={`${chatList.visible ? 'hidden' : ''} btn btn-reverse`} onClick={hideChatList}>{chatList.text}</button>
                <div className={`${chatList.visible ? chatListWidth : 'hidden'} border-r pr-4`}>
                    <div className="flex justify-around items-center">
                        <h2 className="text-lg font-bold my-4">Friends</h2>
                        <button className="btn btn-reverse" onClick={openPopUp}>...</button>
                        <div className={`${popUpOpen ? '' : 'hidden'} absolute top-40 left-100 bg-blue-100 p-10 w-1/4`}>
                            <div className="relative">
                                <button className="absolute top-0 right-0" onClick={openPopUp}>x</button>
                                <select name="" id="" className=" btn btn-reverse" onChange={(e) => handleSelectWidth(e)}>
                                    <option value='w-2/4'>default</option>
                                    <option value='w-1/4'>1/4</option>
                                    <option value='w-full'>1/2</option>
                                    <option value='hide'>{chatList.text}</option>
                                </select>
                                <form onSubmit={(event) => newChatName(event)}>
                                    <input type="text" name="name" id="name" placeholder="name of chat" onChange={(e) => setChatName(e.target.value)} value={chatName} />
                                    <input type="hidden" name="creator_id" value={senderId} />
                                    <button type="submit">
                                        new chat
                                    </button></form>
                                <button onClick={showChats} >
                                    refresh
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="max-h-100 overflow-y-auto">
                        {chats.map((chat: Chat) => (
                            <div key={chat.id}>
                                <div className="web-block" onContextMenu={(event) => openContextMenu(event, chat.id)}>
                                    <button onClick={() => chatSelect(chat.id)}

                                        className={`block px-3 py-5 rounded w-full ${chat.id - 1 === chatId
                                            ? 'bg-blue-100 border border-blue-300'
                                            : 'hover:bg-gray-100'
                                            }`}>
                                        <div> {chat.name} </div>
                                    </button>
                                </div>
                                <div className="adaptive-block" onContextMenu={(event) => openContextMenu(event, chat.id)}>
                                    <Link href={`friends/${chat.id}`}
                                        onClick={() => chatSelect(chat.id)}
                                        className={`block px-3 py-5 rounded w-full ${chat.id - 1 === chatId
                                            ? 'bg-blue-100 border border-blue-300'
                                            : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        <div
                                        >
                                            {chat.name}
                                        </div>
                                    </Link>
                                </div>

                                <div className={`${context.visible ? '' : 'hidden'} w-100 bg-transparent absolute top-40 bg-blue-100`}>
                                    <div className={`${context.visible ? '' : 'hidden'} absolute bg-blue-200 flex flex-col items-center gap-4 p-5 w-50`}
                                        style={{ left: `${context.x_position}px`, top: `${context.y_position}px` }}>
                                        <div className="relative">
                                            <div className="absolute top-0 right-0">
                                                x
                                            </div>
                                            <h3>{chat.name}</h3>
                                            <button>edit</button>
                                            <button>delete</button>
                                            <button>forward</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${isSelectedChat ? '' : 'hidden'} web-block w-full`}>
                    <ChatWindow key={chatId + 1} chat_id={chatId + 1} />
                </div>
            </div>
        </MainLayout>
    )
}