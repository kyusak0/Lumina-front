'use client'

import MainLayout from "./layouts/mainLayout";
import Api, { getCSRF } from "./_api/api";
import Link from "next/link";

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

    return (
        <MainLayout>
            <div className="w-full flex items-center justify-around">
                <form method="get" className="form-create" onSubmit={handleSubmit}>
                    <button type="submit" className="btn">create</button>
                </form>
                <div>
                    <button className="btn btn-reverse">...</button>
                </div>
            </div>
            <div className="posts mt-5">
                {posts.map((post: Post) => (
                    <div className="post flex flex-col gap-5 relative p-10" key={post.id}>
                        <div className="flex justify-evenly items-center">
                            <Link href={`profile/${post.creator_id}`}>
                            </Link>
                        </div>
                        {post.media ? '' : <img src={`${post.media}`} alt="" />}
                        
                        <h2 className="text-2xl">
                            {post.postTitle}
                        </h2>
                        <p>
                            {post.postDesc}
                        </p>
                        <div className="btn btn-reverse w-10 mb-2">like</div>
                        <div className="btn btn-reverse absolute left-0 bottom-0 w-full">comment</div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}