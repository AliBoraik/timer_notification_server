import { Router } from "express";
import {
    startHourTimerController,
    endHourTimerController,
    changeHourTimerController,
    getHoursWorkedController,
} from "./timer.controller";
import { body, query } from "express-validator";
import { timeRegexPattern } from "./timer.helper";
import {verifyTokenAndGetUserIdMiddleware} from "../../middlewares/auth.middleware";

export const timerRouter = Router();

timerRouter.post(
    "/start",
    verifyTokenAndGetUserIdMiddleware,
    body("start_at")
        .exists()
        .withMessage("Наличие обязательно")
        .matches(timeRegexPattern)
        .withMessage("Должен быть формат HH:MI:SS"),
    startHourTimerController
);
timerRouter.post(
    "/end",
    verifyTokenAndGetUserIdMiddleware,
    body("end_at")
        .exists()
        .withMessage("Наличие обязательно")
        .matches(timeRegexPattern)
        .withMessage("Должен быть формат HH:MI:SS"),
    endHourTimerController
);
timerRouter.post(
    "/change",
    verifyTokenAndGetUserIdMiddleware,
    query("day").exists().withMessage("Наличие обязательно").isDate().withMessage("Должен быть формат YYYY-MM-DD"),
    body(["start_at", "end_at"])
        .exists()
        .withMessage("Наличие обязательно")
        .matches(timeRegexPattern)
        .withMessage("Должен быть формат HH:MI:SS"),
    changeHourTimerController
);
timerRouter.get(
    "/hours",
    verifyTokenAndGetUserIdMiddleware,
    query("day").exists().withMessage("Наличие обязательно").isDate().withMessage("Должен быть формат YYYY-MM-DD"),
    getHoursWorkedController
);
