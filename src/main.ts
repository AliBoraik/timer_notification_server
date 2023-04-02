import { config } from "dotenv";
config();

import express from "express";
import { router } from "./routes/routes";
import { httpLogMiddleware, logger } from "./services/logging.service";
import { startCrons } from "./services/cron.service";
import { getKeycloakPublicKey } from "./modules/auth/auth.service";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();
startCrons();

app.use(cors());
app.use("/api/v1", router).use(httpLogMiddleware);

app.listen(PORT, async () => {
    await getKeycloakPublicKey();
    logger.info(`Start app on date: ${new Date()}, port: ${PORT}`);
});

process.on("SIGINT", () => {
    logger.info(`Closed app on date: ${new Date()}, commit: ${process.env.CI_COMMIT_SHA}`);
    process.exit();
});
