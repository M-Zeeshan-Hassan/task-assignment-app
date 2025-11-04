import { Controller, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SubTaskService } from './subtask.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskStatus } from '@prisma/client';

@Controller('subtasks')
@UseGuards(JwtAuthGuard)
export class SubTaskController {
  constructor(private subTaskService: SubTaskService) {}

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: {
      title?: string;
      description?: string;
      status?: TaskStatus;
      assignedUserId?: string | null;
    },
    @Request() req,
  ) {
    return this.subTaskService.update(id, updateData, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.subTaskService.remove(id, req.user.id);
  }
}