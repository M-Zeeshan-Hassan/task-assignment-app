import { SubTaskService } from './subtask.service';
import { TaskStatus } from '@prisma/client';
export declare class SubTaskController {
    private subTaskService;
    constructor(subTaskService: SubTaskService);
    update(id: string, updateData: {
        title?: string;
        description?: string;
        status?: TaskStatus;
        assignedUserId?: string | null;
    }, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
