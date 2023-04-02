import {endPendingTasksAtMidnightCron} from '../modules/timer/timer.cron'

export const startCrons = async () => {
    endPendingTasksAtMidnightCron.start()
}