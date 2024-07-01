import { Injectable } from '@nestjs/common';
import { TaskDocument } from '../task/task.schema';
import { TaskService } from '../task/task.service';
import { createTaskText, dateToCronFormat } from '../shared/helpers/utils';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TelegramService } from '../telegram/telegram.service';
import { BUTTON } from '../shared/constants';
import { errorHandler } from '../shared/errorHandlers';

@Injectable()
export class ScheduleService {
    constructor(
        private readonly taskService: TaskService,
        private readonly telegramService: TelegramService,
        private schedulerRegistry: SchedulerRegistry,
    ) {
        this.createScheduleForTasks();
    }

    async createScheduleForTasks() {
        try {
            const tasks: TaskDocument[] = await this.taskService.findAll();
            tasks.forEach((task) => this.addCronJob(task));
        } catch (error) {
            errorHandler(error);
        }
    }

    addCronJob(task: TaskDocument) {
        const cronTimes: string[] = task.startAt.map((startTime) =>
            dateToCronFormat(startTime, task.repeatInterval),
        );
        const text = createTaskText(task);
        const replyMarkup = {
            inline_keyboard: [[BUTTON.TO_FINISH]],
        };

        try {
            cronTimes.forEach((cronTime) => {
                const job = new CronJob(
                    cronTime,
                    () => {
                        this.telegramService.sendMessage({
                            chatId: task.chatId,
                            text,
                            reply_markup: replyMarkup,
                        });
                    },
                    null,
                    true,
                    'Europe/Moscow',
                );
                const cronName = task.id + task.chatId + task.title + cronTime;
                this.schedulerRegistry.addCronJob(cronName, job);
                job.start();
                console.log(
                    `job ${task.title} start with cronTime ${cronTime}`,
                );
            });
        } catch (error) {
            errorHandler(error);
        }
    }
}
