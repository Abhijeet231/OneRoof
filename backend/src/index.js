//dotenv stuf is handled in the package.json

import app from './app.js';
import connectDB from './db/index.js';

import http from "http";
import {Server} from "socket.io";
import socketHandler from './socket/index.js';


connectDB().then(
   () => {
    const PORT = process.env.PORT || 3000;
    
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN || "http://localhost:5173",
            credentials: true,
        },
    });

    socketHandler(io);

    server.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
   }
)
.catch((err) => {
    console.log('MONGODB CONNECTION FAILED!!', err);
    
});