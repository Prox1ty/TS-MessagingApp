import { Router } from "express";
import { User } from "../models/userModel.js";
import type { AnyARecord } from "node:dns";

const userRouter = Router();

userRouter.post('/register', async (req: any, res: any) => {
    const { name, email, password } = req.body;
    const createdUser = await User.create({
        name,
        email,
        password
    })

    return res.json({success: "true"});
});

userRouter.post('/login', async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const token = await (User as typeof User & {
            generateAndReturnToken(credentials: { email: string; password: string }): Promise<string>;
        }).generateAndReturnToken({ email, password });

        res.cookie("token", token, {
            path: '/',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration date
        })

        return res.status(200).json({ success: true, message: "Logged in" });
    } catch (error) {
        console.error("Sign-in failed:", error);
        return res.status(303).json({ success: false, error, message: "Failed to Log in" });
    }
});

userRouter.get('/me', async (req: any, res: any) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });

    return res.json(req.user);
})

export { userRouter };