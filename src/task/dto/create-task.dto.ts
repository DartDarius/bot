import { REPEAT_INTERVAL } from 'src/shared/enum';

export class CreateTaskDto {
    title: string;
    chatId: number;
    text: string;
    startAt: Date[];
    repeatInterval: REPEAT_INTERVAL;
}
