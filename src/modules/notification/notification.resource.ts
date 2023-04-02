import { query } from "../../services/db.service";
import { Notification, NotificationDetailed, NotificationId, UserId } from "./notification.types";

export const getAllNotificationResource = async (userId: UserId): Promise<[Notification] | null> => {
    const q = `select id,
                      title,
                      body,
                      is_read,
                      created_at::date::text as date
               from notifications
               where user_id = $1`;
    const { rows } = await query(q, [userId]);
    console.log(rows)
    return rows;
};

export const getByIdNotificationResource = async (
    userId: UserId,
    id: NotificationId
): Promise<NotificationDetailed | null> => {
    const q = `select id,
                      title,
                      full_text,
                      created_at::date::text as date
               from notifications
               where user_id = $1
                 and id = $2`;
    const { rows } = await query(q, [userId, id]);

    return rows[0];
};
