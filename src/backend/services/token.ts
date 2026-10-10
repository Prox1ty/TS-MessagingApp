import { config } from "dotenv";
import { type userPayload } from "../models/userModel.js";
import JWT from 'jsonwebtoken';
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

config({
    path: resolve(dirname(fileURLToPath(import.meta.url)), "../../.env"),
});

const getJwtSecret = (): string => {
    const secret = process.env.JWTSECRET;
    if (!secret) {
        throw new Error("JWTSECRET is not configured. Add it to src/.env.");
    }

    return secret;
};


export function generateUserToken(user: any) {
    const payload: userPayload = {
        name: user.name,
        email: user.email
    };

    const secret = getJwtSecret();
    const token = JWT.sign(payload, secret);
    return token;
}

export const validateToken = (token: string) => {
    const secret = getJwtSecret();
    const payload = JWT.verify(token, secret);
    return payload;
}