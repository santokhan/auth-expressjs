import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome the SANB Authentication API.");
});

export { router }