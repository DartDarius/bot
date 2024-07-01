import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';
import { ConfigModule } from '@nestjs/config';
import { PollingService } from './polling/polling.service';
import { BotService } from './bot/bot.service';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TaskModule,
        DatabaseModule.register(),
        ScheduleModule,
    ],
    controllers: [AppController],
    providers: [AppService, TelegramService, PollingService, BotService],
})
export class AppModule {}
