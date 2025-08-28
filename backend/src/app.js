import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRoutes.js";


const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN
    }
));

app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

//Register User Routes
app.use('/api/v1/users', userRouter);





export default app ;