import { Task } from "@prisma/client";

export type TaskResponse = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    createdAt: Date;
}

export type AddTaskRequest = {
    title: string;
    description: string;
    dueDate: string;
}

export type AccTaskRequest = {
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