import { getByIdNotificationResource, getAllNotificationResource } from "./notification.resource";
import { Notification, NotificationDetailed, NotificationId, UserId } from "./notification.types";

export const getAllNotificationsService = async (userId: UserId): Promise<[Notification] | null> => {
    return await getAllNotificationResource(userId);
};

export const getNotificationByIdService = async (
    userId: UserId,
    id: NotificationId
): Promise<NotificationDetailed | null> => {
    return await getByIdNotificationResource(userId, id);
};
