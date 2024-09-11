import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { ACCESS_TOKEN_SECRET } = process.env;
if (!ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET must be defined in .env');

// Middleware to read and decode bearer token
function authenticateToken(req, res, next) {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token

        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
}

export { authenticateToken }