import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class SubTaskService {
  constructor(private prisma: PrismaService) {}

  async update(id: string, updateData: { 
    title?: string; 
    description?: string; 
    status?: TaskStatus; // FIX: Use TaskStatus enum instead of string
    assignedUserId?: string | null; // FIX: Allow null for unassigning
  }, userId: string) {
    const subTask = await this.prisma.subTask.findUnique({
      where: { id },
      include: {
        task: {
          include: { assignedUsers: true },
        },
      },
    });

    if (!subTask) {
      throw new NotFoundException('Subtask not found');
    }

    const hasAccess = subTask.task.creatorId === userId || 
                     subTask.task.assignedUsers.some(user => user.id === userId);

    if (!hasAccess) {
      throw new ForbiddenException('You cannot update this subtask');
    }

    // FIX: Create properly typed data object
    const data: any = {};
    
    if (updateData.title !== undefined) data.title = updateData.title;
    if (updateData.description !== undefined) data.description = updateData.description;
    if (updateData.status !== undefined) data.status = updateData.status;
    if (updateData.assignedUserId !== undefined) {
      data.assignedUserId = updateData.assignedUserId;
    }

    const updatedSubTask = await this.prisma.subTask.update({
      where: { id },
      data,
      include: {
        assignedUser: {
          select: { id: true, name: true, email: true },
        },
        task: {
          select: { id: true, title: true },
        },
      },
    });

    return updatedSubTask;
  }

  // Remove the problematic methods for now, we'll add them back later
  async remove(id: string, userId: string) {
    const subTask = await this.prisma.subTask.findUnique({
      where: { id },
      include: { task: true },
    });

    if (!subTask) {
      throw new NotFoundException('Subtask not found');
    }

    if (subTask.task.creatorId !== userId) {
      throw new ForbiddenException('Only the task creator can delete subtasks');
    }

    await this.prisma.subTask.delete({
      where: { id },
    });

    return { message: 'Subtask deleted successfully' };
  }
}