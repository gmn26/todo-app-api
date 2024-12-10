import { Request, Response, NextFunction } from "express";
import { AddTaskRequest } from "../models/task.model";
import { TaskService } from "../services/task.service";

export class TaskController {
    static async addTask(req: Request, res: Response, next: NextFunction) {
        try {
            const request: AddTaskRequest = req.body;
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
}