import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Request, Response } from "express";
import { UserId } from "../modules/timer/timer.types";
import { getUserIdByName } from "../modules/auth/auth.resource";
import { toId } from "../types";

config();

export async function verifyTokenAndGetUserIdMiddleware(req: Request, res: Response, next) {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        if (!accessToken) {
            return res.status(401).send({ error: "Токен не найден" });
        }
        jwt.verify(accessToken, process.env.TWJ_PUBLIC_KEY, { algorithms: ["ES256"] }, async (err, verified) => {
            if (err) {
                return res.status(401).send({ error: err });
            }
            const userName = verified.preferred_username;
            const userId = toId<UserId>(await getUserIdByName(userName));
            if (!userId) {
                return res.status(401).send({ error: `Пользователь ${userName} не найден в базе данных` });
            }
            req.userId = userId;
            next();
        });
    } catch (error) {
        return res.status(401).send({ error: "Токен не найден" });
    }
}

declare global {
    namespace Express {
        export interface Request {
            username?: string;
            userId?: UserId;
        }
    }
}