const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log(`Connected to MongoDB successfully`);
}).catch((err) => console.error('Connection to MongoDB failed:', err.message));
