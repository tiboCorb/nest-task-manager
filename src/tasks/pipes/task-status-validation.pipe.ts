import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValisationPipe implements PipeTransform {

    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any) {
        value = value.toUppercase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is ans invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }

}