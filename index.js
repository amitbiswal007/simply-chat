import express from 'express'
import { Socket } from 'node:dgram';
import { createServer } from 'node:http'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server);



app.get('/', (req, res) => {
    const directoryName = dirname(fileURLToPath(import.meta.url))
    res.sendFile(directoryName + "/index.html")
})


io.on('connection', (socket) => {
    console.log("User connected the session")


    socket.on('message', (message) => {
        console.log("Message received from client, sending it back to server " + message)

        io.emit('message', message)

    })

    socket.on('disconnect', () => {
        console.log("User left the session, Bye bye")
    })
})


server.listen(3000, () => {
    console.log("Server listening at http://localhost:3000")
})