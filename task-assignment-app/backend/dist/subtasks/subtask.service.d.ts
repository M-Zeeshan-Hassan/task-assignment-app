import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '@prisma/client';
export declare class SubTaskService {
    private prisma;
    constructor(prisma: PrismaService);
    update(id: string, updateData: {
        title?: string;
        description?: string;
        status?: TaskStatus;
        assignedUserId?: string | null;
    }, userId: string): Promise<{
        task: {
            id: string;
            title: string;
        };
        assignedUser: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        taskId: string;
        assignedUserId: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
