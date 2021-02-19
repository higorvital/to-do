import { Router } from "express";
import authMiddleware from "../../../../../shared/infra/http/middlewares/auth";
import TasksController from "../../../controllers/TasksController";

const tasksController = new TasksController();

const tasksRouter = Router();

tasksRouter.use(authMiddleware);

tasksRouter.post('/', tasksController.create);
tasksRouter.put('/:task_id', tasksController.update);
tasksRouter.delete('/:task_id', tasksController.delete);

export default tasksRouter;