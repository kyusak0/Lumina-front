'use client'

import MainLayout from "./layouts/mainLayout";
import Api, { getCSRF } from "./_api/api";
import Link from "next/link";
import Popup from "./components/popup/Popup";
import { useState } from "react";

getCSRF();

export interface Post {
    id: number,
    creator_id: number,
    postTitle: string,
    postDesc: string,
    media: string | null,
}

export default function MainPage() {
    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const posts: Post[] = [{
        id: 1,
        creator_id: 1,
        postTitle: 'Welcome to lumina',
        postDesc: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext',
        media: null,
    },]

    const [liked, setLiked] = useState(false)

    const likeClick = () => {
        setLiked(!liked)
    }

    return (
        <MainLayout>
            <div className="w-full flex items-center  justify-evenly">
                <form method="post" className="form-create" onSubmit={handleSubmit}>
                    <button type="submit" className="px-5 py-2 rounded-lg text-white bg-green-400 hover:bg-green-500">create post</button>
                </form>
                <form method="get" className="form-search" onSubmit={handleSubmit}>
                    <button type="submit" className="px-5 py-2 rounded-lg text-white bg-green-400 hover:bg-green-500">search post</button>
                </form>
            </div>
            <div className="posts mt-5">
                {posts.map((post: Post) => (
                    <div className="post flex flex-col gap-5 relative p-10" key={post.id}>
                        <div className="flex justify-between items-center">
                            <Link href={`profile/${post.creator_id}`}>
                                {post.creator_id}
                            </Link>
                            <div>
                                <Popup popupId="popup1" openPopupText="...">
                                    <h3>
                                        context nemu
                                    </h3>

                                    <div>
                                        <div>
                                            forward
                                        </div>
                                        <div>
                                            save
                                        </div>
                                        <div>
                                            report
                                        </div>
                                        <Popup popupId="popup2" openPopupText="comment">
                                            <h3>
                                                comment to {post.postTitle}
                                            </h3>

                                            <div>
                                                <div>
                                                    comments here
                                                </div>
                                            </div>

                                            <form method="post" className="form-create" onSubmit={handleSubmit}>
                                                <input type="text" name="" id="" placeholder="type your comment...." />
                                                <button type="submit" className="px-5 py-2 rounded-lg text-white bg-green-400 hover:bg-green-500">comment</button>
                                            </form>
                                        </Popup>
                                    </div>

                                </Popup>
                            </div>
                        </div>
                        {post.media ? '' : <img src={`${post.media}`} alt="" />}
                        <h2 className="text-2xl">
                            {post.postTitle}
                        </h2>
                        <p>
                            {post.postDesc}
                        </p>
                        <button className="" onClick={likeClick}>
                            {liked ? '❤️' : '🤍'}
                            
                        </button>
                        <Popup popupId="popup-comment" openPopupText="comment">
                            <h3>
                                comment to {post.postTitle}
                            </h3>

                            <div>
                                <div>
                                    comments here
                                </div>
                            </div>

                            <form method="post" className="form-create" onSubmit={handleSubmit}>
                                <input type="text" name="" id="" placeholder="type your comment...." />
                                <button type="submit" className="px-5 py-2 rounded-lg text-white bg-green-400 hover:bg-green-500">comment</button>
                            </form>
                        </Popup>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}