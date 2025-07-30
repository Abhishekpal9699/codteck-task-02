const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        const text = message.toString();
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(text);
            }
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
