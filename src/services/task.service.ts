import { prismaClient } from "../app/database";
import { ResponseError } from "../lib/error.response";
import { TaskRequest, FetchTaskResponse, TaskResponse, toFetchResponse, toTaskResponse, DeleteResponse, toDelResponse } from "../models/task.model";
import { TaskValidation } from "../validation/task.validation";
import { Validation } from "../validation/validation";

export class TaskService {
    static async fetchTask(): Promise<FetchTaskResponse> {
        const datas = await prismaClient.task.findMany();
        const total = await prismaClient.task.count();

        return toFetchResponse(datas, total);
    }

    static async addTask(request: TaskRequest): Promise<TaskResponse> {
        const addTask = Validation.validate(
            TaskValidation.ADD,
            request
        );

        const add = await prismaClient.task.create({
            data: addTask,
        });

        return toTaskResponse(add);
    }

    static async editTask(request: TaskRequest, taskId: string): Promise<TaskResponse> {
        const editTask = Validation.validate(
            TaskValidation.ADD,
            request
        );

        const checkTask = await prismaClient.task.findUnique({
            where: {
                id: taskId,
            },
        });

        if (!checkTask) {
            throw new ResponseError(404, "Task not found");
        }

        checkTask.title = editTask.title;
        checkTask.description = editTask.description;
        checkTask.dueDate = editTask.dueDate;

        const edit = await prismaClient.task.update({
            where: {
                id: taskId,
            },
            data: checkTask,
        });

        return toTaskResponse(edit);
    }

    static async accTask(request: string): Promise<TaskResponse> {
        const accTask = Validation.validate(
            TaskValidation.ID,
            request
        );

        const checkTask = await prismaClient.task.findUnique({
            where: {
                id: accTask,
            },
        });

        if (!checkTask) {
            throw new ResponseError(404, "Task not found");
        }

        const acc = await prismaClient.task.update({
            where: {
                id: accTask,
            },
            data: {
                status: "Complete",
            },
        });

        return toTaskResponse(acc);
    }

    static async deleteTask(request: string): Promise<DeleteResponse> {
        const deleteTask = Validation.validate(
            TaskValidation.ID,
            request
        );

        const checkTask = await prismaClient.task.findUnique({
            where: {
                id: deleteTask,
            },
        });

        if (!checkTask) {
            throw new ResponseError(404, "Task not found");
        }

        const del = await prismaClient.task.delete({
            where: {
                id: deleteTask,
            },
        });

        return toDelResponse(del);
    }
}