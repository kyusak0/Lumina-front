'use client'

import MainLayout from "@/app/layouts/mainLayout";
import { useParams } from "next/navigation";
const Video = () => {
    const params = useParams();
    const { vid } = params;
    return (<MainLayout><p>Video: {vid}</p>
         {/* это страница с видео , где его можно посмотреть, также справа сделать небольшую подборку с похожими видео */}
    </MainLayout>
    )
}


export default Video;