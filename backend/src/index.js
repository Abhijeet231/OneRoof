// dotenv stuff is handled in the package.json

import app from './app.js';
import connectDB from './db/index.js';

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MONGODB CONNECTION FAILED!!', err);
  });
