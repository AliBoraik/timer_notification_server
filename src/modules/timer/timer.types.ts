import { Brand } from "../../types";

export type Time = string; // HH:MM:SS
export type Day = Date;

export type TimerId = Brand<number, "timer_id">;
export type UserId = Brand<number, "user_id">; //TODO: replace to user module

export type TimerSpan = {
    start_at: Time;
    end_at: Time;
};

export type WorkedHours = {
    hours_timer: Time;
    hours_turnstile: Time;
    all_hours: Time;
};
