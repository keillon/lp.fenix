interface Notification {
    id: string;
    type: string;
    message: string;
    createdAt: string;
    read: boolean;
}
export declare class NotificationsController {
    private readonly logger;
    private notifications;
    constructor();
    getAllNotifications(): Notification[];
    getNotificationById(id: string): {
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: Notification;
        message?: undefined;
    };
    createNotification(data: any): {
        success: boolean;
        data: Notification;
    };
    markAsRead(id: string): {
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: Notification;
        message?: undefined;
    };
}
export {};
