import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // Ensure you import jsonwebtoken

dotenv.config();

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

if (!JWT_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error('JWT_SECRET and REFRESH_TOKEN_SECRET must be defined in environment variables');
}

/**
 * Creates an access token.
 * @param {Object} payload - The payload to include in the token.
 * @returns {String|null} - The generated token or null if the secret is not defined.
 */
function makeAccessToken(payload) {
    if (JWT_SECRET) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    } else {
        console.error('JWT_SECRET is not defined');
        return null;
    }
}

/**
 * Creates a refresh token.
 * @param {Object} payload - The payload to include in the token.
 * @returns {String|null} - The generated token or null if the secret is not defined.
 */
function makeRefreshToken(payload) {
    if (REFRESH_TOKEN_SECRET) {
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    } else {
        console.error('REFRESH_TOKEN_SECRET is not defined');
        return null;
    }
}

/**
 * Generate a verification JWT for the user.
 * @param {Object} payload - The payload to include in the token.
 * @returns {string|null} - The generated token or null if the secret is not defined.
 */
function makeVerifyToken(payload) {
    if (JWT_SECRET) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
    } else {
        console.error('JWT_SECRET is not defined');
        return null;
    }
}

function decodeAccessToken(token) {
    if (JWT_SECRET) {
        return jwt.verify(token, JWT_SECRET);
    } else {
        console.error('JWT_SECRET is not defined');
        return null;
    }
}

function decodeRefreshToken(token) {
    if (REFRESH_TOKEN_SECRET) {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } else {
        console.error('REFRESH_TOKEN_SECRET is not defined');
        return null;
    }
}

function decodeVerifyToken(token) {
    if (JWT_SECRET) {
        return jwt.verify(token, JWT_SECRET);
    } else {
        console.error('JWT_SECRET is not defined');
        return null;
    }
}

export { makeAccessToken, makeRefreshToken, decodeAccessToken, decodeRefreshToken, makeVerifyToken, decodeVerifyToken };
