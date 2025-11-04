import { NotificationService } from './notification.service';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        type: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    }[]>;
    getUnreadCount(req: any): Promise<number>;
    markAsRead(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        type: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    }>;
    markAllAsRead(req: any): Promise<{
        message: string;
    }>;
}
