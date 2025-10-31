import Link from "next/link";
import MainLayout from "../layouts/mainLayout"

import { chats, Chat } from "./data/chats";

export default function Friends() {

    return (
        <>
            <MainLayout>
                <h1>
                    Friends
                </h1>
                {chats.map((chat: Chat) => (
                    <div key={chat.id} className="">
                        <Link href={`/friends/chat/${chat.id}`}>
                            {chat.name}
                        </Link>
                    </div>
                ))}
            </MainLayout>

        </>
    )
}