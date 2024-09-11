import { makeAccessToken } from "./token.js";
import dotenv from 'dotenv';

dotenv.config();

const { BASE_URL } = process.env

if (!BASE_URL) {
    throw new Error('BASE_URL must be defined in environment variables')
}

/**
 * Generate a password reset link for the given email, with an optional redirect query parameter.
 * @param {string} email - The email address to reset.
 * @param {string} [redirect] - The URL to redirect to after password reset.
 * @returns {string} The password reset link.
 */
function makePasswordResetLink(email, redirect) {
    const token = makeAccessToken({ email })
    const query = { token };
    if (redirect) {
        query.redirect = redirect;
    }
    const queryString = new URLSearchParams(query).toString();
    const passwordResetLink = `${BASE_URL}/reset?${queryString}`;
    return passwordResetLink;
}

export { makePasswordResetLink }