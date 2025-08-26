//dotenv stuf is handled in the package.json

import app from './app.js';
import connectDB from './db/index.js';

connectDB().then(
    () => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is Running on Port: ${process.env.PORT}`);
            
        })
    }
)
.catch((err) => {
    console.log('MONGODB CONNECTION FAILED!!', err);
    
});