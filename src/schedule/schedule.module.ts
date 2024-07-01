import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from '../task/task.schema';
import { TaskService } from '../task/task.service';
import { TelegramService } from '../telegram/telegram.service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ],
    controllers: [ScheduleController],
    providers: [
        ScheduleService,
        TaskService,
        TelegramService,
        SchedulerRegistry,
    ],
})
export class ScheduleModule {}
