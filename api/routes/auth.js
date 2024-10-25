import express from "express";
import { login, register, protect, logout } from "../controller/auth.js ";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/verify", protect, (req, res) => {
    res.status(200).json({
        status: true,
        user: req.user
    })
})

export default router;