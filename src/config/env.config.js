import dotenv from 'dotenv';

dotenv.config({
    path : './env'
})

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

export {
    PORT,
    MONGODB_URI,
    DB_NAME
}