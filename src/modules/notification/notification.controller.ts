import { Request, Response } from "express";
import { getAllNotificationsService, getNotificationByIdService } from "./notification.service";
import { logger } from "../../services/logging.service";
import { validationResult } from "express-validator";
import { toId } from "../../types";
import { NotificationId, UserId } from "./notification.types";

export const getNotificationsController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId: UserId = req.userId;
        const allNotifications = await getAllNotificationsService(userId);

        if (!allNotifications)
            return res.status(404).send({
                error: "Уведомления не найдены!",
            });

        res.status(200).send({
            data: allNotifications,
        });
    } catch (error) {
        logger.error(`${error.message} , path ${req.originalUrl}`);
        res.status(500).send({
            error: "Ошибка на стороне сервера",
        });
    }
};

export const getNotificationByIdController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const userId: UserId = req.userId;
        const { id } = req.params;
        const notificationId = toId<NotificationId>(id);

        const notification = await getNotificationByIdService(userId, notificationId);
        if (!notification)
            return res.status(404).send({
                error: "Уведомление не найдено!",
            });

        res.status(200).send({
            data: notification,
        });
    } catch (error) {
        logger.error(`${error.message} , path ${req.originalUrl}`);
        res.status(500).send({
            error: "Ошибка на стороне сервера",
        });
    }
};
