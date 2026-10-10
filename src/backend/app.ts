import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io'
import { userRouter } from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { checkForAuthCookie } from './middleware/authentication.js'
import { config } from 'dotenv';
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

config({
    path: resolve(dirname(fileURLToPath(import.meta.url)), "../../.env"),
});

mongoose.connect(process.env.MONGODB_CONNECTION!)
    .then(() => console.log("Connected to mongodb"))
    .catch((error) => console.error("MongoDB connection failed:", error));

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use('/user', userRouter);


const port: string = process.env.PORT!;

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
        console.log(`Message for room ${data.room} from ${data.author}: `, data.message);
        // only broadcast to that room
        socket.to(data.room).emit('receive_message', {author: data.author, text: data.message});
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






