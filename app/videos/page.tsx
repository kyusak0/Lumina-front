'use client'

import MainLayout from "../layouts/mainLayout";
import Link from "next/link";

export interface VideoPromps {
    id: number,
}

export default function Videos() {
    const videos: VideoPromps[] = [{
        id: 0,
    }, {
        id: 1,
    }]
    return (
        <MainLayout>
            <h1>Videos Catalog</h1>
            <div >{videos.map((video: VideoPromps) => (
                <div key={video.id}>
                    <Link href={`videos/${video.id}`}>
                        { video.id }
                    </Link>
                </div>
            ))}</div>


            {/* это каталог с видосами, по нажатию на любое видео открывается страница с ним[slug], */}
        </MainLayout>

    )
}