import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '@prisma/client'; // FIX: Import the enum

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async update(id: string, updateData: { 
    title?: string; 
    description?: string; 
    status?: TaskStatus; // FIX: Use TaskStatus enum instead of string
  }, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { assignedUsers: true },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const canUpdate = task.creatorId === userId || 
                     task.assignedUsers.some(user => user.id === userId);

    if (!canUpdate) {
      throw new ForbiddenException('You cannot update this task');
    }

    // FIX: Create properly typed data object
    const data: any = {};
    
    if (updateData.title !== undefined) data.title = updateData.title;
    if (updateData.description !== undefined) data.description = updateData.description;
    if (updateData.status !== undefined) data.status = updateData.status;

    return this.prisma.task.update({
      where: { id },
      data,
      include: {
        creator: {
          select: { id: true, name: true, email: true },
        },
        assignedUsers: {
          select: { id: true, name: true, email: true },
        },
        subtasks: true,
      },
    });
  }

  // Keep other methods but remove the problematic update method signature
  async create(taskData: { title: string; description?: string }, userId: string) {
    return this.prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        creatorId: userId,
        assignedUsers: {
          connect: { id: userId },
        },
      },
      include: {
        creator: {
          select: { id: true, name: true, email: true },
        },
        assignedUsers: {
          select: { id: true, name: true, email: true },
        },
        subtasks: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.task.findMany({
      where: {
        OR: [
          { creatorId: userId },
          { assignedUsers: { some: { id: userId } } },
        ],
      },
      include: {
        creator: {
          select: { id: true, name: true, email: true },
        },
        assignedUsers: {
          select: { id: true, name: true, email: true },
        },
        subtasks: {
          include: {
            assignedUser: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        _count: {
          select: { subtasks: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, name: true, email: true },
        },
        assignedUsers: {
          select: { id: true, name: true, email: true },
        },
        subtasks: {
          include: {
            assignedUser: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const hasAccess = task.creatorId === userId || 
                     task.assignedUsers.some(user => user.id === userId);

    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }

  async remove(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.creatorId !== userId) {
      throw new ForbiddenException('Only the task creator can delete this task');
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Task deleted successfully' };
  }
}