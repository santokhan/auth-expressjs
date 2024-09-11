import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: root endpoint
 *     description: This is an root endpoint
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get("/", (req, res) => {
    res.send("Welcome the SANB Authentication API.");
});

export { router }