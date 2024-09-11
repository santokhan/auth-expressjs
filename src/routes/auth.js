import path from "path";
import fs from "fs";
import { Router } from "express";
import bcryptjs from "bcryptjs";
import User from "../mongoose/models/User.js";
import * as auth from "../mongoose/actions/auth.js";
import { decodeAccessToken, decodeRefreshToken, decodeVerifyToken, makeAccessToken, makeRefreshToken, } from "../utils/token.js";
import { makeVerificationLink } from "../utils/verification.js";
import { validateToken } from "../middlewares/validatetoken.js";
import { makePasswordResetLink } from "../utils/makeLink.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json("Email is required");
    if (!password) return res.status(400).json("Password is required");

    try {
        const user = await auth.signup(email, password);
        if (!user) return res.status(400).json("User already exists");

        const data = {
            id: user._id,
            email: user.email,
            verified: user.verified,
            v: user.__v,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        const accessToken = makeAccessToken({ id: user._id, email: user.email });
        if (accessToken) data.accessToken = accessToken;

        const refreshToken = makeRefreshToken({ id: user._id });
        if (refreshToken) {
            data.refreshToken = refreshToken
            await User.updateOne({ _id: user._id }, { refreshToken: refreshToken })
            return res.json(data)
        }
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ message: "User already exists", details: err })
        }
        return res.status(400).json(err)
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json("Email is required");
    if (!password) return res.status(400).json("Password is required");

    try {
        const user = await auth.signin(email, password);
        if (!user) return res.status(400).json("User not found"); // Immediate return

        const data = {
            id: user._id,
            email: user.email,
            verified: user.verified,
            v: user.__v,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        const accessToken = makeAccessToken({ id: user._id, email: user.email });
        if (accessToken) data.accessToken = accessToken;

        const refreshToken = makeRefreshToken({ id: user._id });
        if (refreshToken) {
            data.refreshToken = refreshToken
            await User.updateOne({ _id: user._id }, { refreshToken: refreshToken })
            return res.json(data)
        }
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get("/signout", authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;

        const user = await auth.signout(id)
        if (!user) return res.status(400).json("User not found"); // Immediate return
        return res.json({ message: "Signout successful" });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/verify", authenticateToken, async (req, res) => {
    const { email, id } = req.user;
    if (!email) return res.status(400).json({ error: "Email is required" }); // Immediate return
    const redirect = req.query.redirect

    try {
        const user = await auth.find(email);
        if (!user) return res.status(404).json({ error: "User not found" }); // Immediate return

        if (user.verified) return res.json({ message: "User already verified", email }); // Immediate return
        const verificationLink = makeVerificationLink(email, redirect)
        if (!verificationLink) return res.status(500).json({ error: "An error occurred during verification" }); // Immediate return
        await auth.sendVerificationEmail(email, verificationLink)
        res.json({ message: "Verification email sent", email, redirect });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during verification" });
    }
});

router.get("/verify", async (req, res) => {
    const { token, redirect } = req.query

    try {
        const decoded = decodeVerifyToken(token);
        if (!decoded) {
            return res.status(400).json({ error: "Invalid verification token" });
        } else {
            const { email } = decoded;
            const user = await auth.verify(email);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            } else {
                if (redirect) {
                    return res.redirect(redirect);
                } else {
                    return res.json({ message: "User verified" });
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during verification" });
    }
});

router.post("/forgot", async (req, res) => {
    const { email } = req.body;
    let { redirect } = req.body;
    redirect = redirect || req.query.redirect
    if (!email) res.status(400).json("Email is required"); // Immediate return

    User.findOne({ email }).then((user) => {
        if (!user) res.status(400).json("User not found"); // Immediate return
        const forgotLink = makePasswordResetLink(email, redirect)
        if (!forgotLink) res.status(500).json("An error occurred during verification"); // Immediate return
        auth.sendForgotPasswordEmail(email, forgotLink).then(() => {
            res.json({ forgotLink, message: "Forgot password email sent" });
        }).catch((err) => {
            res.status(500).json(err);
        })
    }).catch((err) => {
        res.status(500).json(err);
    })
});

router.get('/reset', validateToken, async (req, res) => {
    try {
        const filePath = path.resolve('public', 'reset.html');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file: ${err.message}`);
                res.status(500).json({ error: "Internal server error", details: err.message });
            } else {
                res.type('html').send(data); // Set the MIME type to HTML
            }
        })
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

router.post("/reset", async (req, res) => {
    const { password, token, redirect } = req.body
    if (!password) return res.status(400).json("Password is required");
    if (!token) return res.status(400).json("Token is required");

    const decoded = decodeAccessToken(token);
    if (!decoded.email) return res.status(400).json("Invalid token");

    const filter = {}
    if (decoded.email) filter.email = decoded.email;
    if (decoded.id) filter._id = decoded.id;

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.updateOne(filter, { password: hashedPassword });
        if (!user) return res.status(400).json("User not found"); // Immediate return
        // cors issue redirect should be on client side
        // if (redirect) return res.redirect(redirect);
        return res.json({ message: "Password updated", user: decoded });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/token", async (req, res) => {
    const { refreshToken } = req.body;
    if (refreshToken) {
        try {
            const decoded = decodeRefreshToken(refreshToken);
            const id = decoded?.id;

            if (id) {
                User.findById(id).then((user) => {
                    if (!user) {
                        return res.status(400).json("Invalid refresh token"); // Immediate return
                    }
                    if (user.refreshToken !== refreshToken) {
                        return res.status(400).json("Invalid refresh token"); // Immediate return
                    }
                    const accessToken = makeAccessToken({ id });
                    if (accessToken) {
                        res.json({ accessToken });
                    } else {
                        res.status(400).json("Invalid refresh token");
                    }
                })
            } else {
                res.status(400).json("Uesr Id not exists on refresh token");
            }
        } catch (error) {
            res.status(400).json("Invalid refresh token");
        }
    } else {
        res.status(400).json("Refresh token is required");
    }
});

export { router }