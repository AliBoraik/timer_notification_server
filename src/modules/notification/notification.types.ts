import { Brand } from "../../types";

export type UserId = Brand<number, "user_id">;
export type NotificationId = Brand<number, "notification_id">;

export type Notification = {
    id: NotificationId;
    title: string;
    body: string;
    is_read: boolean;
    date: Date;
};

export type NotificationDetailed = {
    id: NotificationId;
    title: string;
    full_text: string;
    date: Date;
};
