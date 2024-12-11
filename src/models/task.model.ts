import { Task } from "@prisma/client";

export type FetchTaskResponse = {
    tasks: TaskResponse[],
    totalTask: number,
}

export type TaskResponse = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    createdAt: Date;
}

export type TaskRequest = {
    title: string;
    description: string;
    dueDate: string;
}

export type DeleteResponse = {
    title: string;
}

export type TaskIdRequest = {
    id: string;
}

export function toTaskResponse(task: Task): TaskResponse {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        createdAt: task.createdAt,
    }
}

export function toFetchResponse(tasks: Task[], totalTask: number): FetchTaskResponse {
    const taskResponse: TaskResponse[] = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        createdAt: task.createdAt,
    }));

    return {
        tasks: taskResponse,
        totalTask: totalTask,
    }
}
export function toDelResponse(task: Task): DeleteResponse {
    return {
        title: task.title,
    }
}