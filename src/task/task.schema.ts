import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { REPEAT_INTERVAL } from 'src/shared/enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    chatId: number;

    @Prop({ required: true })
    text: string;

    @Prop({ type: [Date] })
    startAt: Date[];

    @Prop({ default: null })
    repeatInterval: REPEAT_INTERVAL;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
