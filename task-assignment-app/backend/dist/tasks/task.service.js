"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TaskService = class TaskService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async update(id, updateData, userId) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: { assignedUsers: true },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        const canUpdate = task.creatorId === userId ||
            task.assignedUsers.some(user => user.id === userId);
        if (!canUpdate) {
            throw new common_1.ForbiddenException('You cannot update this task');
        }
        const data = {};
        if (updateData.title !== undefined)
            data.title = updateData.title;
        if (updateData.description !== undefined)
            data.description = updateData.description;
        if (updateData.status !== undefined)
            data.status = updateData.status;
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
    async create(taskData, userId) {
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
    async findAll(userId) {
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
    async findOne(id, userId) {
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
            throw new common_1.NotFoundException('Task not found');
        }
        const hasAccess = task.creatorId === userId ||
            task.assignedUsers.some(user => user.id === userId);
        if (!hasAccess) {
            throw new common_1.ForbiddenException('You do not have access to this task');
        }
        return task;
    }
    async remove(id, userId) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (task.creatorId !== userId) {
            throw new common_1.ForbiddenException('Only the task creator can delete this task');
        }
        await this.prisma.task.delete({
            where: { id },
        });
        return { message: 'Task deleted successfully' };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskService);
//# sourceMappingURL=task.service.js.map