import { decodeAccessToken } from "../utils/token.js";

// Middleware to check token validity
const validateToken = async (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({ error: "Token is required" }); // Immediate return
    }

    try {
        const decoded = decodeAccessToken(token);
        if (decoded?.exp < Date.now() / 1000) {
            return res.status(400).json({ error: "Token expired" });
        }
        req.user = decoded; // Optionally attach user info to req
        next(); // Proceed to the route handler
    } catch (error) {
        return res.status(400).json({ error: "Invalid token", details: error.message });
    }
};

export { validateToken }