'use client'

import MainLayout from "./layouts/mainLayout";
import Api, { getCSRF } from "./_api/api";
import Link from "next/link";
import Popup from "./components/popup/Popup";
import { FormEvent, useState } from "react";
import { sources } from "next/dist/compiled/webpack/webpack";
import api from "./_api/api";

getCSRF();

export interface Post {
    id: number,
    creator_id: number,
    postTitle: string,
    postDesc: string,
    media: string | null,
}

export default function MainPage() {
    const [formCreateData, setFormCreateData] = useState<{
        user_id: number,
        source_id: number | null,
        title: string,
        description: string,
    }>({
        user_id: 1,
        source_id: 1,
        title: 'qwe',
        description: 'qwe',
    });
    const [disabledCreateBtn, setDisabledCreateBtn] = useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const updatedData = ({ ...formCreateData, [name]: value });

        if (updatedData.title.length > 0 || updatedData.description.length > 0) {
            setDisabledCreateBtn(false)
        } else {
            setDisabledCreateBtn(true)
        }

        setFormCreateData(updatedData);

    }
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

    const createPost = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://api.localhost.test:8001/api/create-post`, {
                method: 'POST',
                body: JSON.stringify(formCreateData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                },
                credentials: 'include',
            });
            const result = await response.json();
            console.log(result)
        } catch (err: any) {
            alert(err.message)
        }

    }

    return (
        <MainLayout>
            <div className="w-full flex items-center  justify-evenly">

                <Popup
                    popupId={'createPost'}
                    openPopupTrigger={
                        <button
                            className="px-5 py-2 rounded-lg text-white bg-green-400 hover:bg-green-500"
                        >Создать свой пост
                        </button>
                    }>
                    <div className="flex flex-col gap-5">
                        <h2 className="text-2xl font-bold text-green-400">
                            Создать свой пост
                        </h2>
                        <form onSubmit={createPost} className="flex flex-col gap-5">
                            <label
                                htmlFor="source">
                                Прикрепить файл(необязательно)
                            </label>
                            <input
                                type="file"
                                name="source"
                                id="source"
                                className="p-3 border border-gray-300 rounded flex-1 focus:outline-none focus:border-green-500"
                            />
                            <label htmlFor="title">
                                Заголовок поста
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                onChange={handleChange}
                                value={formCreateData.title}
                                className="p-3 border border-gray-300 rounded flex-1 focus:outline-none focus:border-green-500"
                            />
                            <label htmlFor="description">
                                Текст поста
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                onChange={handleChange}
                                value={formCreateData.description}
                                className="p-3 border border-gray-300 rounded flex-1 focus:outline-none focus:border-green-500" />
                            {/* 'user_id','','','' */}
                            <button
                                className={`px-5 py-2 rounded-lg text-white bg-green-400 disabled:bg-gray-300 hover:bg-green-500`}
                                type="submit"
                                disabled={disabledCreateBtn}>
                                Создать
                            </button>
                        </form>
                    </div>
                </Popup>
                <form method="get" className="form-search" onSubmit={handleSubmit}>

                    <button type="submit" className="px-5 py-2 rounded-lg text-white bg-green-400 hover:bg-green-500">search post</button>
                </form>
            </div>
            <div className="posts flex flex-col items-center mt-5">
                {posts.map((post: Post) => (
                    <div className="post flex flex-col gap-5 relative p-10" key={post.id}>
                        <div className="flex justify-between items-center">
                            <Link href={`profile/${post.creator_id}`}>
                                {post.creator_id}
                            </Link>
                            <div>
                                <Popup
                                    popupId="popup1"
                                    openPopupTrigger={
                                        <button
                                            className="px-5 py-2 rounded-lg border-2 text-green-400 border-green-400 hover:bg-gray-100"
                                        >...
                                        </button>}>
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
                                        <Popup popupId="popup2"
                                            openPopupTrigger={
                                                <button
                                                    className="px-5 py-2 rounded-lg border-2 text-green-400 border-green-400 hover:bg-gray-100"
                                                >Комментарии
                                                </button>
                                            }>
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
                        <Popup popupId="popup-comment"
                            openPopupTrigger={
                                <button
                                    className="px-5 py-2 rounded-lg border-2 text-green-400 border-green-400 hover:bg-gray-100"
                                >Написать свой комментарий
                                </button>}>
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