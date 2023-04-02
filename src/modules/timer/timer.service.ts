import {
    addChangedHourTimer,
    addStartHourTimer,
    deleteHourTimersByDay,
    getPendingHourTimer,
    getWeeklyWorkedHoursFromTurnstilesByDay,
    getWorkedHoursFromTimersByDay,
    getWorkedHoursFromTurnstilesByDay,
    updateEndAllPendingTimers,
    updateEndHourTimer,
} from "./timer.resource";
import { Day, Time, TimerId, TimerSpan, UserId, WorkedHours } from "./timer.types";

export const startHourTimerService = async (start_at: Time, user_id: UserId): Promise<TimerId> => {
    return await addStartHourTimer(start_at, user_id);
};

export const endHourTimerService = async (end_at: Time, user_id: UserId): Promise<TimerSpan> => {
    return await updateEndHourTimer(end_at, user_id);
};

export const isPendingHourTimerExistsValidateService = async (user_id: UserId): Promise<boolean> => {
    const data = await getPendingHourTimer(user_id);
    return !!data;
};

export const changeHourTimerService = async (
    user_id: UserId,
    day: Day,
    start_at: Time,
    end_at: Time
): Promise<boolean> => {
    await deleteHourTimersByDay(day, user_id);
    await addChangedHourTimer(user_id, start_at, end_at);

    return true;
};

export const getHoursWorkedService = async (user_id: UserId, day: Day): Promise<WorkedHours> => {
    const data = {
        hours_timer: undefined,
        hours_turnstile: undefined,
        all_hours: undefined,
        // created_at: undefined
    };

    data.hours_timer = (await getWorkedHoursFromTimersByDay(day, user_id)) || "00:00:00";

    data.hours_turnstile = (await getWorkedHoursFromTurnstilesByDay(day, user_id)) || "00:00:00";

    data.all_hours = (await getWeeklyWorkedHoursFromTurnstilesByDay(day, user_id)) || "00:00:00";

    return data;
};

export const endAllPendingTasksService = async (end_at: Time): Promise<boolean> => {
    const data = await updateEndAllPendingTimers(end_at);

    return !!data.length;
};
