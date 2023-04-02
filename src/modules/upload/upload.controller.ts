import { Request, Response } from "express";
import { logger } from "../../services/logging.service";
import { uploadTurnstileService } from "./upload.service";


export const uploadController = async (req: Request, res: Response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("Файлы не загружены.");
        }
        const { file } = req.files;
        const upload = await uploadTurnstileService(file)
        if (!upload) {
            return res.status(400).send({
                error: "Не может быть загружен",
            });
        }
        return res.sendStatus(200);
    } catch (error) {
        logger.error(`${error.message} , path ${req.originalUrl}`);
        res.status(500).send({
            error: "Ошибка сервера",
        });
    }
};

