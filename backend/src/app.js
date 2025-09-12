import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

// User Routes
import userRouter from "./routes/user.router.js";
app.use('/api/v1/users', userRouter);

// Listing Routes
import listingRouter from "./routes/listing.router.js";
app.use('/api/v1/listings', listingRouter);

//Review Routes
import reviewRouter from "./routes/review.router.js";
app.use('/api/v1/listings/:listingId/reviews', reviewRouter);

export default app ;