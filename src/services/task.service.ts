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

    static async changeStat(id: string, status: string): Promise<TaskResponse> {
        const accId = Validation.validate(
            TaskValidation.ID,
            id
        );

        const accStatus = Validation.validate(
            TaskValidation.STATUS,
            status
        );

        const checkTask = await prismaClient.task.findUnique({
            where: {
                id: accId,
            },
        });

        if (!checkTask) {
            throw new ResponseError(404, "Task not found");
        }

        const change = await prismaClient.task.update({
            where: {
                id: accId,
            },
            data: {
                status: accStatus,
            },
        });

        return toTaskResponse(change);
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