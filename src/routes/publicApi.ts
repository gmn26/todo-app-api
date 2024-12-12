import express from "express";
import { TaskController } from "../controllers/task.controller";

export const publicRoutes = express.Router();

publicRoutes.get('/task', TaskController.fetchTask);
publicRoutes.post('/task/add', TaskController.addTask);
publicRoutes.patch('/task/changestatus/:id/:status', TaskController.changeStat);
publicRoutes.put('/task/edit/:id', TaskController.editTask);
publicRoutes.delete('/task/del/:id', TaskController.deleteTask);