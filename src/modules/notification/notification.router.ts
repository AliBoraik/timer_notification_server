import { Router } from "express";
import { getNotificationsController, getNotificationByIdController } from "./notification.controller";
import { param } from "express-validator";
import { verifyTokenAndGetUserIdMiddleware } from "../../middlewares/auth.middleware";

export const notificationRouter = Router();

notificationRouter.get("/"
    , verifyTokenAndGetUserIdMiddleware
    , getNotificationsController);
notificationRouter.get("/:id"
    , verifyTokenAndGetUserIdMiddleware
    , param("id").isNumeric()
    , getNotificationByIdController);
