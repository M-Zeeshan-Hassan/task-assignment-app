import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '@prisma/client';
export declare class TaskService {
    private prisma;
    constructor(prisma: PrismaService);
    update(id: string, updateData: {
        title?: string;
        description?: string;
        status?: TaskStatus;
    }, userId: string): Promise<{
        creator: {
            id: string;
            email: string;
            name: string;
        };
        assignedUsers: {
            id: string;
            email: string;
            name: string;
        }[];
        subtasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.TaskStatus;
            dueDate: Date | null;
            taskId: string;
            assignedUserId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        creatorId: string;
    }>;
    create(taskData: {
        title: string;
        description?: string;
    }, userId: string): Promise<{
        creator: {
            id: string;
            email: string;
            name: string;
        };
        assignedUsers: {
            id: string;
            email: string;
            name: string;
        }[];
        subtasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.TaskStatus;
            dueDate: Date | null;
            taskId: string;
            assignedUserId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        creatorId: string;
    }>;
    findAll(userId: string): Promise<({
        _count: {
            subtasks: number;
        };
        creator: {
            id: string;
            email: string;
            name: string;
        };
        assignedUsers: {
            id: string;
            email: string;
            name: string;
        }[];
        subtasks: ({
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        creatorId: string;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        creator: {
            id: string;
            email: string;
            name: string;
        };
        assignedUsers: {
            id: string;
            email: string;
            name: string;
        }[];
        subtasks: ({
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        creatorId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
