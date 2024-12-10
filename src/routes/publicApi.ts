import express from "express";
import { TaskController } from "../controllers/task.controller";

export const publicRoutes = express.Router();

publicRoutes.post('/task/add', TaskController.addTask);