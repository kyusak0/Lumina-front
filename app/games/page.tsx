'use client'

import MainLayout from "../layouts/mainLayout"
import Link from "next/link"

export interface GamesPromps{
    id: number,
}

export default function Games(){

    const games:GamesPromps[]=[
        {
            id:0,
        },{
            id:1,
        }
    ]

    return(
        <>
        <MainLayout>
            <div >{games.map((game: GamesPromps) => (
                <div key={game.id}>
                    <Link href={`games/${game.id}`}>
                        { game.id }
                    </Link>
                </div>
            ))}</div>
            
            {/* это каталог с играми, по нажатию на любую игру открывается страница с ним [slug], */}
        </MainLayout>
         
        </>
    )
}