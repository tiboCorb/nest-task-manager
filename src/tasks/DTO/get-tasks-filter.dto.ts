import { TaskStatus } from "../task.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetTasksFilterDto{

    @IsOptional()
    @IsIn([TaskStatus.DONE,TaskStatus.OPEN,TaskStatus.IN_PROGRESS])
    status : TaskStatus

    @IsOptional()
    @IsNotEmpty()
    search: string;
}