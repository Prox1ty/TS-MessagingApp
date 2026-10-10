import { validateToken } from '../services/token.js'

export const checkForAuthCookie = (cookieName: string) => {
    return (req: any, res: any, next: any) => {
        const cookieToken = req.cookies[cookieName];
        if (!cookieToken) return next();

        try {
            const userPayload = validateToken(cookieToken);
            req.user = userPayload;
        } catch(error) {
            console.error(`Error authenticating cookie: ${error}`);
        }

        return next();
    }
}