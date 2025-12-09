import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 5000});

wss.on('connection', function (ws:any) {
    console.log('New client connected');
    
    ws.on('message', function (message:any) {
        console.log('Received:', message.toString());
        broadcastMessage(message, ws);
    });

    ws.on('close', function () {
        console.log('Client disconnected');
        broadcastMessage('User left the chat', ws);
    });

    ws.send('Welcome to chat!');
    broadcastMessage('New user joined', ws);
});

function broadcastMessage(message:any, currentClient:any) {
    wss.clients.forEach(function each(client:any) {
        if (client !== currentClient && client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
        }
    });
}

console.log('WebSocket server running on port 5000');