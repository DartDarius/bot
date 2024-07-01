import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { ISendMessage } from '../shared/interfaces';
import { errorHandler } from '../shared/errorHandlers';

@Injectable()
export class TelegramService {
    private bot: TelegramBot;

    constructor(private readonly configService: ConfigService) {
        const botToken = this.configService.get('BOT_TOKEN');
        this.bot = new TelegramBot(botToken);
    }

    async sendMessage({ chatId, text, topicId, reply_markup }: ISendMessage) {
        if (!text) return;

        try {
            await this.bot.sendMessage(chatId, text, {
                parse_mode: 'Markdown',
                message_thread_id: topicId,
                reply_markup,
            });
        } catch (error) {
            errorHandler(error);
        }
    }

    async editMessage(text: string, chatId: any, messageId: any) {
        try {
            await this.bot.editMessageText(text, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: undefined,
            });
        } catch (error) {
            errorHandler(error);
        }
    }
}
