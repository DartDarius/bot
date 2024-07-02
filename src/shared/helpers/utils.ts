import { REPEAT_INTERVAL } from '../enum';
import { TaskDocument } from '../../task/task.schema';
import { TEXT } from '../constants';

export function dateToCronFormat(time: Date, repeatInterval: REPEAT_INTERVAL) {
    const minutes = time.getMinutes();
    const hours = time.getHours();
    const dayOfWeek = time.getDay();
    const dayOfMonth = time.getDate();
    const month = time.getMonth();
    let cronTime = `05 ${minutes} ${hours} `;

    switch (repeatInterval) {
        case REPEAT_INTERVAL.DAY:
            cronTime = cronTime + '* * *';
            break;
        case REPEAT_INTERVAL.WORKING_DAYS:
            cronTime = cronTime + '* * 1-5';
            break;
        case REPEAT_INTERVAL.WEEK:
            cronTime = cronTime + `* * ${dayOfWeek}`;
            break;
        case REPEAT_INTERVAL.MONTH:
            cronTime = cronTime + `${dayOfMonth} * *`;
            break;
        default:
            cronTime = cronTime + `${dayOfMonth} ${month} *`;
            break;
    }
    return cronTime;
}

export function createTaskText(task: TaskDocument) {
    const text = task.title + '\n' + task.text + '\n\n' + TEXT.DESCRIPTION;
    return text;
}
