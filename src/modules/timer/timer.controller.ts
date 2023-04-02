import { Request, Response } from "express";
import {
    startHourTimerService,
    endHourTimerService,
    isPendingHourTimerExistsValidateService,
    changeHourTimerService,
    getHoursWorkedService,
} from "./timer.service";
import { logger } from "../../services/logging.service";
import { validationResult } from "express-validator";

export const startHourTimerController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const validation_errors = validationResult(req);
        if (!validation_errors.isEmpty()) return res.status(400).send({ errors: validation_errors.array() });

        const userId = req.userId;

        const { start_at } = req.body;

        if (await isPendingHourTimerExistsValidateService(userId))
            return res.status(400).send({ message: "Таймер уже запущен" });

        const result = await startHourTimerService(start_at, userId);

        res.send({
            data: result
        });
    } catch (error) {
        logger.error(`${error.message}, path: ${req.originalUrl}`);
        res.status(500).send({ error: "Ошибка на стороне сервера" });
    }
};

export const endHourTimerController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const validation_errors = validationResult(req);
        if (!validation_errors.isEmpty()) return res.status(400).send({ errors: validation_errors.array() });

        const userId = req.userId;

        const { end_at } = req.body;

        if (!(await isPendingHourTimerExistsValidateService(userId)))
            return res.status(400).send({ message: "Нет запущенных таймеров" });

        const result = await endHourTimerService(end_at, userId);

        res.send({
            data: result
        });
    } catch (error) {
        logger.error(`${error.message}, path: ${req.originalUrl}`);
        res.status(500).send({ error: "Ошибка на стороне сервера" });
    }
};

export const changeHourTimerController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const validation_errors = validationResult(req);
        if (!validation_errors.isEmpty()) return res.status(400).send({ errors: validation_errors.array() });

        const userId = req.userId;

        const day = String(req.query.day);
        const { start_at, end_at } = req.body;

        const result = await changeHourTimerService(userId, new Date(day), start_at, end_at);

        if (result) res.sendStatus(200);
    } catch (error) {
        logger.error(`${error.message}, path: ${req.originalUrl}`);
        res.status(500).send({ error: "Ошибка на стороне сервера" });
    }
};

export const getHoursWorkedController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const validation_errors = validationResult(req);
        if (!validation_errors.isEmpty()) return res.status(400).send({ errors: validation_errors.array() });

        const userId = req.userId;

        const day = String(req.query.day);

        const result = await getHoursWorkedService(userId, new Date(day));

        res.send({
            data: result
        });
    } catch (error) {
        logger.error(`${error.message}, path: ${req.originalUrl}`);
        res.status(500).send({ error: "Ошибка на стороне сервера" });
    }
};
