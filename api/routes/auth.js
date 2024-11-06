import express from "express";
import { login, register, protect, logout, updatePassword } from "../controller/auth.js ";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);
router.patch("/updatePassword", protect, updatePassword);
router.post("/verify", protect, (req, res) => {
    res.status(200).json({
        status: true,
        user: req.user
    })
})

export default router;