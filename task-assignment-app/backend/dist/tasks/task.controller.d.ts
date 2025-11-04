import { TaskService } from './task.service';
import { TaskStatus } from '@prisma/client';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    create(taskData: {
        title: string;
        description?: string;
    }, req: any): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, updateData: {
        title?: string;
        description?: string;
        status?: TaskStatus;
    }, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
