import dotenv from "dotenv";
import { makeVerifyToken } from "./token.js";

dotenv.config();

const { ACCESS_TOKEN_SECRET, PORT } = process.env;

if (!ACCESS_TOKEN_SECRET || !PORT) {
  throw new Error(
    "ACCESS_TOKEN_SECRET and PORT must be defined in environment variables"
  );
}

/**
 * Generate a verification link for the given email, with an optional redirect query parameter.
 * @param {string} email - The email address to verify.
 * @param {string} [redirect] - The URL to redirect to after verification.
 * @returns {string} The verification link.
 */
function makeVerificationLink(email, redirect) {
  const token = makeVerifyToken({ email });
  const query = { token };
  if (redirect) {
    query.redirect = redirect;
  }
  const verificationLink =
    `http://localhost:${PORT}/verify` +
    "?" +
    new URLSearchParams(query).toString();
  return verificationLink;
}

export { makeVerificationLink };
