import { prismaClient } from "../app/database";
import { AddTaskRequest, TaskResponse, toTaskResponse } from "../models/task.model";
import { TaskValidation } from "../validation/task.validation";
import { Validation } from "../validation/validation";

export class TaskService {
    static async addTask(request: AddTaskRequest): Promise<TaskResponse> {
        const addTask = Validation.validate(
            TaskValidation.ADD,
            request
        );

        const add = await prismaClient.task.create({
            data: addTask,
        });

        return toTaskResponse(add);
    }
}