import cron from "node-cron";
import { logger } from "../../services/logging.service";
import { endAllPendingTasksService } from "./timer.service";

export const endPendingTasksAtMidnightCron = cron.schedule("0 0 * * *", async () => {
    try {
        if (await endAllPendingTasksService("00:00:00")) {
            logger.info(`${new Date()} [Timer's Cron]: All pending timers have been ended`);
        } else {
            logger.info(`${new Date()} [Timer's Cron]: All timers are ended already`);
        }
    } catch (error) {
        logger.info(`${new Date()} ERROR [Timer's Cron]: ${error}`);
    }
});
