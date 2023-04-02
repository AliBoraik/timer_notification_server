import { Request, Response } from "express";
import { findUserWithKeyCloak, refreshTokenService } from "./auth.service";
import { validationResult } from "express-validator";
import { logger } from "../../services/logging.service";
import { Result, Tokens } from "./auth.type";

export const loginController = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        const { username, password } = req.body;

        const auth: Result<Tokens> = await findUserWithKeyCloak(username, password);
        if (auth.error) {
            return res.status(400).send({ error: auth.error });
        }
        return res.status(200).send({ data: auth.data });
    } catch (error) {
        logger.error(`${error.message}`);
        return res.sendStatus(500);
    }
};

export const refreshTokenController = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        const { refresh_token } = req.body;

        const auth: Result<Tokens> = await refreshTokenService(refresh_token);
        if (auth.error) {
            return res.status(400).send({ error: auth.error });
        }
        return res.status(200).send({ data: auth.data });
    } catch (error) {
        logger.error(`${error.message}`);
        return res.sendStatus(500);
    }
};