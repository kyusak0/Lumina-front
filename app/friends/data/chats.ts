export interface Chat {
    id: number;
    name: string;
    messages: Messages[];
}

export interface Messages {
    id: number;
    mess: string;
    timestamp: string;
}

export const chats: Chat[] = [
    {
        id: 1,
        name: 'lumina friend1',
        messages: [{
            id: 0,
            mess: "lumina friend1lumina friend1lumina friend1lumina friend1",
            timestamp: '12.12',
        }, {
            id: 1,
            mess: "lumina friend1lumina friend1lumina friend1",
            timestamp: '12.12',
        }],
    }, {
        id: 2,
        name: 'lumina friend2',
        messages: [{
            id: 0,
            mess: "lumina friend2lumina friend2",
            timestamp: '12.12',
        }, {
            id: 1,
            mess: "lorem ipsum",
            timestamp: '12.12',
        }],
    }, {
        id: 3,
        name: 'lumina friend3',
        // id users
        messages: [{
            id: 0,
            mess: "lumina friend3lumina friend3",
            timestamp: '12.12',
        }, {
            id: 1,
            mess: "lorem ipsum",
            timestamp: '12.12',
        }],
    }, {
        id: 4,
        name: 'lumina friend4',
        messages: [{
            id: 0,
            mess: "lumina friend4lumina friend4",
            timestamp: '12.12',
        }, {
            id: 1,
            mess: "lumina friend4lumina friend4",
            timestamp: '12.12',
        }],
    }
]