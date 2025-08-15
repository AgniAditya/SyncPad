import dotenv from 'dotenv';

dotenv.config({
    path : './env'
})

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const ACCESS_TOKEN_SECERT = process.env.ACCESS_TOKEN_SECERT;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_SECERT = process.env.REFRESH_TOKEN_SECERT;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

export {
    PORT,
    MONGODB_URI,
    DB_NAME,
    ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_SECERT,
    REFRESH_TOKEN_SECERT,
    REFRESH_TOKEN_EXPIRY,
    CORS_ORIGIN
}