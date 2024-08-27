import { Injectable } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { CallbackQuery } from 'node-telegram-bot-api';
import { format } from 'date-fns';
import { IPollingError } from '../shared/interfaces';
import { errorHandler } from '../shared/errorHandlers';

@Injectable()
export class PollingService {
    private bot;

    constructor(
        private telegramService: TelegramService,
        private readonly configService: ConfigService,
    ) {
        const botToken = this.configService.get('BOT_TOKEN');

        try {
            this.bot = new TelegramBot(botToken, {
                polling: { interval: 2000, params: { timeout: 10 } },
            });
            this.bot.on('polling_error', (error: IPollingError) => {
                if (error.response && error.response.statusCode === 429) {
                    console.log(
                        'Rate limit exceeded. Retrying in 30 seconds...',
                    );
                    setTimeout(() => {
                        if (this.bot) {
                            this.bot.startPolling();
                        }
                    }, 30000);
                } else {
                    console.error('Polling error:', error);
                }
            });
            this.bot.on('callback_query', (msg) => this.onCallback(msg));
        } catch (error) {
            errorHandler(error);
        }
    }

    async onCallback(msg: CallbackQuery) {
        const chatId = msg.message?.chat.id;
        const messageId = msg.message?.message_id;
        const date = format(new Date(), 'dd.MM.yyyy HH:mm');
        const taskText = msg.message?.text?.split('\n').slice(1).join('\n');
        const EditedText = `✅*Задание выполнено ${date}*` + '\n' + taskText;
        this.telegramService.editMessage(EditedText, chatId, messageId);
    }
}
