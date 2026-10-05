import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io'
import { data } from 'react-router';

const app = express();
app.use(cors());
app.use(express.json());

const port: string = process.env.PORT || '8000';

const httpServer = createServer(app); // let typescript infer type cuz i cant find the type

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // listening for a user wanting to join a specific room
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);

        socket.to(roomId).emit('user_joined', {userId: socket.id});
    });

    socket.on('send_message', (data) => {
        console.log(`Message for room ${data.room}: `, data.message);
        // only broadcast to that room
        socket.to(data.room).emit('receive_message', {author: data.sender, text: data.message});
    })

    socket.on('leave_room', (roomId) => {
        // remove the user from the room
        socket.leave(roomId);
        console.log(`User ${socket.id} left room: ${roomId}`);
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });

})

httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})






