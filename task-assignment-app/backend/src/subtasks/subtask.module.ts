import { Module } from '@nestjs/common';
import { SubTaskService } from './subtask.service';
import { SubTaskController } from './subtask.controller';

@Module({
  controllers: [SubTaskController],
  providers: [SubTaskService],
  exports: [SubTaskService],
})
export class SubTaskModule {}