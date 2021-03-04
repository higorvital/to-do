import { Router } from "express";
import authMiddleware from "../../../../../shared/infra/http/middlewares/auth";
import TasksCompletedController from "../../../controllers/TaskCompletedController";
import TasksImportanceController from "../../../controllers/TaskImportanceController";
import TasksController from "../../../controllers/TasksController";

const tasksController = new TasksController();
const taskImportanceController = new TasksImportanceController();
const taskCompletedController = new TasksCompletedController();

const tasksRouter = Router();

tasksRouter.use(authMiddleware);

tasksRouter.post('/', tasksController.create);
tasksRouter.put('/:task_id', tasksController.update);
tasksRouter.delete('/:task_id', tasksController.delete);

tasksRouter.get('/', tasksController.index);
tasksRouter.get('/completed', taskCompletedController.index);
tasksRouter.get('/important', taskImportanceController.index);

tasksRouter.patch('/:task_id/completed', taskCompletedController.update);
tasksRouter.patch('/:task_id/important', taskImportanceController.update);

export default tasksRouter;