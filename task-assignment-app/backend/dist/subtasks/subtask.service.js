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
exports.SubTaskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubTaskService = class SubTaskService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async update(id, updateData, userId) {
        const subTask = await this.prisma.subTask.findUnique({
            where: { id },
            include: {
                task: {
                    include: { assignedUsers: true },
                },
            },
        });
        if (!subTask) {
            throw new common_1.NotFoundException('Subtask not found');
        }
        const hasAccess = subTask.task.creatorId === userId ||
            subTask.task.assignedUsers.some(user => user.id === userId);
        if (!hasAccess) {
            throw new common_1.ForbiddenException('You cannot update this subtask');
        }
        const data = {};
        if (updateData.title !== undefined)
            data.title = updateData.title;
        if (updateData.description !== undefined)
            data.description = updateData.description;
        if (updateData.status !== undefined)
            data.status = updateData.status;
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
    async remove(id, userId) {
        const subTask = await this.prisma.subTask.findUnique({
            where: { id },
            include: { task: true },
        });
        if (!subTask) {
            throw new common_1.NotFoundException('Subtask not found');
        }
        if (subTask.task.creatorId !== userId) {
            throw new common_1.ForbiddenException('Only the task creator can delete subtasks');
        }
        await this.prisma.subTask.delete({
            where: { id },
        });
        return { message: 'Subtask deleted successfully' };
    }
};
exports.SubTaskService = SubTaskService;
exports.SubTaskService = SubTaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubTaskService);
//# sourceMappingURL=subtask.service.js.map