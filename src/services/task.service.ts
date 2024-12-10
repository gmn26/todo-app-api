import { prismaClient } from "../app/database";
import { ResponseError } from "../lib/error.response";
import { AccTaskRequest, AddTaskRequest, TaskResponse, toTaskResponse } from "../models/task.model";
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

    static async accTask(request: AccTaskRequest): Promise<TaskResponse> {
        const accTask = Validation.validate(
            TaskValidation.ACC,
            request
        );

        const checkTask = await prismaClient.task.findUnique({
            where: {
                id: accTask.id,
            },
        });

        if (!checkTask) {
            throw new ResponseError(404, "Task not found");
        }

        const acc = await prismaClient.task.update({
            where: {
                id: accTask.id,
            },
            data: {
                status: "Complete",
            },
        });

        return toTaskResponse(acc);
    }
}