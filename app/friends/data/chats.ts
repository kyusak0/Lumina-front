export interface Chat {
    id: number;
    name: string;
    mess: string;
    time: string;
}


export const chats: Chat[] = [
    { id: 1, name: 'lumina friend1', mess: "lorem ipsum", time: '12.12' },
    { id: 2, name: 'lumina friend2', mess: "lorem ipsum", time: '12.12' },
    { id: 3, name: 'lumina friend3', mess: "lorem ipsum", time: '12.12' },
    { id: 4, name: 'lumina friend4', mess: "lorem ipsum", time: '12.12' }
]