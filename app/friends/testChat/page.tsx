'use client'

import MainLayout from '@/app/layouts/mainLayout';
import api, { getCSRF } from '../../_api/api'
import { useState, useEffect } from 'react';

export interface Message {
    id: number
    content: string
    sender_id: number | null
    chat_id: number | null
}

export default function TestChat() {
    const [senderId, setSenderId] = useState(0);
    const [chatId, setChatId] = useState(1); // Установите конкретный chat_id
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState("");

    // Функция для получения user_id
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

    // Функция для получения сообщений
    const getMessages = async () => {
        try {
            await getCSRF();
            const res = await api.post("/getMess", {
                sender_id: senderId,
                chat_id: chatId,
            });
            
            setMessages(res.data.messages || []);
            console.log("Messages loaded:", res.data.messages);

        } catch (err: any) {
            console.error("Error loading messages:", err);
            alert(err.response?.data?.message || "Error loading messages");
        }
    }

    // Функция отправки сообщения
    const handleSend = async (e: any) => {
        e.preventDefault();

        if (!content.trim()) {
            alert("Message cannot be empty");
            return;
        }

        try {
            await getCSRF();
            const res = await api.post("/sendMessage", {
                sender_id: senderId,
                chat_id: chatId,
                content: content.trim(),
            });
            
            setContent(""); // Очищаем поле ввода
            console.log("Message sent successfully:", res.data);
            
            // Обновляем сообщения после отправки
            await getMessages();
            
        } catch (err: any) {
            alert(err.response?.data?.message || "Error sending message");
        }
    }

    // Загружаем пользователя и сообщения при монтировании
    useEffect(() => {
        const initialize = async () => {
            await checkUser();
        };
        initialize();
    }, []);

    // Загружаем сообщения когда senderId изменился
    useEffect(() => {
        if (senderId > 0) {
            getMessages();
        }
    }, [senderId]);

    return (
        <MainLayout>
            <div className="messages">
                {messages.length === 0 ? (
                    <p>No messages yet</p>
                ) : (
                    messages.map(message => (
                        <div className="rounded border p-3 mb-2" key={message.id}>
                            <p className="text-sm text-gray-500">User ID: {message.sender_id}</p>
                            <p className="text-gray-600">Message: {message.content}</p>
                            <p className="text-sm text-gray-500">Chat ID: {message.chat_id}</p>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={getMessages}
                className="p-2 bg-blue-900 text-white mb-4"
            >
                Refresh Messages
            </button>

            <div className="mb-4">
                Current User ID: {senderId} | Chat ID: {chatId}
            </div>

            <form onSubmit={handleSend} className='flex gap-4 items-center mt-20 px-20'>
                <input 
                    type="text" 
                    name="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    className='p-3 border flex-1' 
                    placeholder="Type"
                />
                <button 
                    type="submit"
                    className='p-3 bg-green-600 text-white'
                >
                    Send Message
                </button>
            </form>
        </MainLayout>
    );
}