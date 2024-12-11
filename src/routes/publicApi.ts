import express from "express";
import { TaskController } from "../controllers/task.controller";

export const publicRoutes = express.Router();

publicRoutes.get('/task', TaskController.fetchTask);
publicRoutes.post('/task/add', TaskController.addTask);
publicRoutes.patch('/task/acc', TaskController.accTask);
publicRoutes.delete('/task/del', TaskController.deleteTask);