import { query } from "../../services/db.service";
import { Day, Time, TimerId, TimerSpan, UserId } from "./timer.types";

export const addStartHourTimer = async (start_at: Time, user_id: UserId): Promise<TimerId> => {
    const q = `insert into hour_timers (user_id, start_at)
               values ($1, current_date + $2::time)
               returning id`;

    const { rows } = await query(q, [user_id, start_at]);
    return rows[0];
};

export const updateEndHourTimer = async (end_at: Time, user_id: UserId): Promise<TimerSpan> => {
    const q = `update hour_timers
               set end_at = current_date + $1::time
               where user_id = $2
                 and end_at is null 
               returning start_at::time, end_at::time`;

    const { rows } = await query(q, [end_at, user_id]);
    return rows[0];
};

export const getPendingHourTimer = async (user_id: UserId): Promise<TimerId> => {
    const q = `select id
               from hour_timers
               where end_at is null
                 and user_id = $1`;

    const { rows } = await query(q, [user_id]);
    return rows[0];
};

export const addChangedHourTimer = async (user_id: UserId, start_at: Time, end_at: Time): Promise<TimerId> => {
    const q = `insert into hour_timers (user_id, start_at, end_at)
               values ($1, current_date + $2::time, current_date + $3::time) returning id`;

    const { rows } = await query(q, [user_id, start_at, end_at]);
    return rows[0];
};

export const deleteHourTimersByDay = async (day: Day, user_id: UserId): Promise<"OK"> => {
    const q = `delete
               from hour_timers
               where $1::date = start_at::date
                 and user_id = $2
               returning 'OK'`;

    const { rows } = await query(q, [day, user_id]);
    return rows[0];
};

export const getWorkedHoursFromTimersByDay = async (day: Day, user_id: UserId): Promise<Time | null> => {
    const q = `select sum(end_at::time - start_at::time)::time as hours
               from hour_timers
               where $1::date = start_at::date
                 and user_id = $2
                 and end_at is not null`;

    const { rows } = await query(q, [day, user_id]);

    if (!rows[0]) return;
    return rows[0]["hours"];
};

export const getWorkedHoursFromTurnstilesByDay = async (day: Day, user_id: UserId): Promise<Time | null> => {
    const q = `select ('00:00:00'::time + (value || ' minutes')::interval)::time as hours
               from hours_turnstiles
               where $1::date = day::date
                 and user_id = $2`;

    const { rows } = await query(q, [day, user_id]);

    if (!rows[0]) return;
    return rows[0]["hours"];
};

export const getWeeklyWorkedHoursFromTurnstilesByDay = async (day: Day, user_id: UserId): Promise<Time | null> => {
    const q = `select ('00:00:00'::time + (sum(value) || ' minutes')::interval)::time as hours
               from hours_turnstiles
               where day::date 
                between date_trunc('week', $1::timestamp)
                 and date_trunc('week', $1::timestamp) + '6 days'
                and user_id = $2`;

    const { rows } = await query(q, [day, user_id]);

    if (!rows[0]) return;
    return rows[0]["hours"];
};

export const updateEndAllPendingTimers = async (end_at: Time): Promise<TimerId[] | null> => {
    const q = `update hour_timers
               set end_at = current_date + $1::time
               where end_at is null 
               returning id`;

    const { rows } = await query(q, [end_at]);

    return rows;
};
