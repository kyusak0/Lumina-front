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

export default Game;