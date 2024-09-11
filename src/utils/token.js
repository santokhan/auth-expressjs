import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // Ensure you import jsonwebtoken

dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

if (!ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET must be defined in .env');
}
if (!REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET must be defined in .env');
}

/**
 * Creates an access token.
 * @param {Object} payload - The payload to include in the token.
 * @returns {String|null} - The generated token or null if the secret is not defined.
 */
function makeAccessToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

/**
 * Creates a refresh token.
 * @param {Object} payload - The payload to include in the token.
 * @returns {String|null} - The generated token or null if the secret is not defined.
 */
function makeRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

/**
 * Generate a verification JWT for the user.
 * @param {Object} payload - The payload to include in the token.
 * @returns {string|null} - The generated token or null if the secret is not defined.
 */
function makeVerifyToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
}

function decodeAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

function decodeRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

function decodeVerifyToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export { makeAccessToken, makeRefreshToken, decodeAccessToken, decodeRefreshToken, makeVerifyToken, decodeVerifyToken };
