import { Request, Response, NextFunction } from "express";
import { TaskIdRequest, TaskRequest } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { logger } from "../app/logging";

export class TaskController {
    static async fetchTask(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await TaskService.fetchTask();
            res.status(200).json({
                success: true,
                message: "Success fetch tasks",
                result
            });
        } catch (error) {
            next(error);
        }
    }

    static async addTask(req: Request, res: Response, next: NextFunction) {
        try {
            const request: TaskRequest = req.body;
            const result = await TaskService.addTask(request);
            res.status(201).json({
                success: true,
                message: "Task added successfully",
                result
            });
        } catch (error) {
            next(error);
        }
    }

    static async editTask(req: Request, res: Response, next: NextFunction) {
        try {
            const request: TaskRequest = req.body;
            const taskId: string = req.params.id;
            const result = await TaskService.editTask(request, taskId);
            res.status(201).json({
                success: true,
                message: "Task edited succesfully",
                result
            });
        } catch (error) {
            next(error);
        }
    }

    static async accTask(req: Request, res: Response, next: NextFunction) {
        try {
            const request: string = req.params.id;
            const result = await TaskService.accTask(request);
            res.status(201).json({
                success: true,
                message: "This task completed",
                result
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const request: string = req.params.id;
            const result = await TaskService.deleteTask(request);
            res.status(201).json({
                success: true,
                message: "Task deleted succesfully",
                result
            });
        } catch (error) {
            next(error);
        }
    }
}