'use client'

import MainLayout from "@/app/layouts/mainLayout";
import { useParams } from "next/navigation";
const Game = () => {
    const params = useParams();
    const { gid } = params;
    return (<MainLayout><p>Game: {gid}</p>
        {/* это страница с игрой , где его можно сыграть, также справа сделать небольшую подборку с похожими играми */}
    </MainLayout>
    )
}

export function generateStaticParams() {
    return [
        { gid: 0 },
        { gid: 1 },
        { gid: 3 }
    ];
}

export default Game;