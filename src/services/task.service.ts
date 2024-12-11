import { prismaClient } from "../app/database";
import { ResponseError } from "../lib/error.response";
import { TaskIdRequest, AddTaskRequest, FetchTaskResponse, TaskResponse, toFetchResponse, toTaskResponse, DeleteResponse, toDelResponse } from "../models/task.model";
import { TaskValidation } from "../validation/task.validation";
import { Validation } from "../validation/validation";

export class TaskService {
    static async fetchTask(): Promise<FetchTaskResponse> {
        const datas = await prismaClient.task.findMany();
        const total = await prismaClient.task.count();

        return toFetchResponse(datas, total);
    }

    static async addTask(request: AddTaskRequest): Promise<TaskResponse> {
        const addTask = Validation.validate(
            TaskValidation.ID,
            request
        );

        const add = await prismaClient.task.create({
            data: addTask,
        });

        return toTaskResponse(add);
    }

    static async accTask(request: TaskIdRequest): Promise<TaskResponse> {
        const accTask = Validation.validate(
            TaskValidation.ID,
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

    static async deleteTask(request: TaskIdRequest): Promise<DeleteResponse> {
        const deleteTask = Validation.validate(
            TaskValidation.ID,
            request
        );

        const checkTask = await prismaClient.task.findUnique({
            where: {
                id: deleteTask.id,
            },
        });

        if (!checkTask) {
            throw new ResponseError(404, "Task not found");
        }

        const del = await prismaClient.task.delete({
            where: {
                id: deleteTask.id,
            },
        });

        return toDelResponse(del);
    }
}