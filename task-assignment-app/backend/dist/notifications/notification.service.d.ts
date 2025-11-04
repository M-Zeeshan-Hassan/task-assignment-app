import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        type: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    }[]>;
    markAsRead(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        type: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<number>;
}
