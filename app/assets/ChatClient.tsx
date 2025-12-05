'use client'

import MainLayout from '@/app/layouts/mainLayout';
import api, { getCSRF } from '../_api/api'
import { useState, useEffect, useRef } from 'react';
import { MouseEvent } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export interface Message {
    id: number
    content: string
    sender_id: number | null
    chat_id: number | null
    created_at?: string
}

interface ChatProps {
    chat_id?: any;
}

export default function Chat({ chat_id }: ChatProps) {
    const params = useParams();
    let cid = params.cid;

    if (chat_id && chat_id !== cid) {
        cid = chat_id;
    }
    const [senderId, setSenderId] = useState(0);
    const [chatId, setChatId] = useState(cid);
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const getMessages = async () => {
        try {
            // Don't call API if senderId is invalid
            if (!senderId || senderId <= 0) {
                console.log("Skipping getMessages: Invalid senderId", senderId);
                return;
            }

            if (!chatId) {
                console.log("Skipping getMessages: No chatId");
                return;
            }

            await getCSRF();
            const res = await api.post("/getMess", {
                sender_id: senderId,
                chat_id: chatId,
            });

            setMessages(res.data.messages || []);
            console.log("Messages loaded successfully");
            // console.log("Messages loaded:", res.data.messages);
        } catch (err: any) {
            console.error("Error loading messages:", err);
        }
    }

    useEffect(() => {
        if (senderId > 0) {
            wsRef.current = new WebSocket('ws://localhost:5000');

            wsRef.current.onopen = () => {
                console.log('Connected to WebSocket');
                setIsConnected(true);

                if (wsRef.current) {
                    wsRef.current.send(JSON.stringify({
                        type: 'join_chat',
                        user_id: senderId,
                        chat_id: chatId
                    }));
                }
            };

            wsRef.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('WebSocket message received:', data);

                    if (data.type === 'new_message') {
                        setMessages(prev => {
                            if (!prev.some(msg => msg.id === data.message.id)) {
                                return [...prev, data.message];
                            }
                            return prev;
                        });
                    } else if (data.type === 'message_history') {
                        setMessages(data.messages || []);
                    } else if (data.type === 'chat_update') {
                        getMessages();
                    }
                } catch (error) {
                    console.log('Raw WebSocket message:', event.data);
                }
            };

            wsRef.current.onclose = () => {
                console.log('Disconnected from WebSocket');
                setIsConnected(false);
            };

            wsRef.current.onerror = (error) => {
                console.log('WebSocket error:', error);
            };

            return () => {
                if (wsRef.current) {
                    wsRef.current.close();
                }
            };
        }
    }, [senderId, chatId]);

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

            console.log("Message sent successfully:", res.data);

            if (wsRef.current && isConnected) {
                const messageData = {
                    type: 'new_message',
                    message: {
                        id: res.data.message_id,
                        content: content.trim(),
                        sender_id: senderId,
                        chat_id: chatId,
                        created_at: new Date().toISOString()
                    }
                };
                wsRef.current.send(JSON.stringify(messageData));
            }

            setContent("");

        } catch (err: any) {
            alert(err.response?.data?.message || "Error sending message");
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const initialize = async () => {
            await checkUser();
        };
        initialize();
    }, []);

    useEffect(() => {
        if (senderId > 0) {
            getMessages();
        }
    }, [senderId]);

    useEffect(() => {
        if (senderId > 0) {
            const interval = setInterval(() => {
                getMessages();
            }, 5000); // Обновлять каждые 5 секунд, если вебсокет не работает корректно

            return () => clearInterval(interval);
        }
    }, [senderId]);

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

    const messClick = (event: MouseEvent<HTMLDivElement>, messId: number) => {

        event.preventDefault();
        console.log(event.type + "" + "" + messId);

        if (messId > 0) {
            setContext({
                mess_id: messId,
                visible: true,
                x_position: event.clientX,
                y_position: event.clientY,
            });

            console.log(event.clientX)
        }



    }

    return (
        <MainLayout>
            <div className={`p-2 flex justify-evenly mb-4 text-white ${isConnected ? 'bg-green-600' : 'bg-red-600'}`}>
                <Link href='friends'>
                    Back
                </Link>
                <p>WebSocket: {isConnected ? 'Connected' : 'Disconnected'}</p>
                <p>User ID: {senderId}</p>
                <p>Chat ID: {chatId}</p>
                <p>Messages' count: {messages.length}</p>
            </div>

            <div className="messages mb-4 max-h-100 overflow-y-auto border rounded-lg p-2">
                {messages.length === 0 ? (
                    <p className="text-gray-500 text-center p-4">No messages yet</p>
                ) : (
                    messages.map((message: Message) => (
                        <div onContextMenu={(e) => { messClick(e, message.id) }}
                            className={`p-3 mb-2 rounded ${message.sender_id === senderId
                                ? 'bg-blue-100 border-l-4 border-blue-500 ml-8'
                                : 'bg-gray-100 border-l-4 border-gray-500 mr-8'
                                }`}
                            key={message.id}
                        >
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-semibold">
                                    {message.sender_id === senderId ? 'You' : `User ${message.sender_id}`}
                                </p>
                                {message.created_at && (
                                    <p className="text-xs text-gray-500">
                                        {new Date(message.created_at).toLocaleTimeString()}
                                    </p>
                                )}
                            </div>
                            <p className="text-gray-800 mt-1">{message.content}</p>


                        </div>
                    ))
                )}


                <div ref={messagesEndRef} />

                <div className={`${context.visible ? '' : 'hidden'} 
            w-full h-100 bg-blue-200 absolute top-40 bg-transparent pointer-events-none`}
                >
                    <div
                        className={`${context.visible ? '' : 'hidden'}
                absolute bg-blue-100 flex flex-col items-center gap-4
                `}
                        style={{
                            left: `${context.x_position}px`,
                            top: `${context.y_position - 200}px`,
                        }}>
                        <h3>Context menu</h3>
                        <button>edit</button>
                        <button>delete</button>
                        <button>forward</button>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={getMessages}
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                    Refresh Messages
                </button>
                <button
                    // onClick={() => setMessages([])}
                    className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                >
                    Clear
                </button>
            </div>

            <form onSubmit={handleSend} className='flex gap-2 items-center px-4'>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='p-3 border border-gray-300 rounded flex-1 focus:outline-none focus:border-blue-500'
                    placeholder="Type your message..."
                    disabled={!isConnected}
                />
                <button
                    type="submit"
                    className='p-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 min-w-20'
                    disabled={!isConnected || !content.trim()}
                >
                    Send
                </button>
            </form>



            {/* <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
                <p>Debug Info:</p>
                <p>• WebSocket State: {wsRef.current?.readyState} (0-Connecting, 1-Open, 2-Closing, 3-Closed)</p>
                <p>• Last update: {new Date().toLocaleTimeString()}</p>
            </div> */}
        </MainLayout>
    );
}