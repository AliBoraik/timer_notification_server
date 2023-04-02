import { Router } from "express";
import { timerRouter } from "../modules/timer/timer.router";
import { notificationRouter } from "../modules/notification/notification.router";
import { uploadRouter } from "../modules/upload/upload.router";
import bodyParser from "body-parser";
import { authRouter } from "../modules/auth/auth.router";

export const router = Router();

router.use(bodyParser.json({ type: "application/json" }));
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

router.use("/timer", timerRouter);
router.use("/notification", notificationRouter);
router.use("/auth", authRouter);
router.use("/upload", uploadRouter);
router.get("/health", (req, res) =>
    res.sendStatus(200));
