import { Router } from "express";
import authMiddleware from "../../../../../shared/infra/http/middlewares/auth";
import SubcategoriesController from "../../../controllers/SubcategoriesController";
import TasksSubcategoriesController from "../../../controllers/TaskSubcategoriesController";

const subcategoriesRouter = Router();

const subcategoriesController = new SubcategoriesController();
const tasksSubcategoriesController = new TasksSubcategoriesController();

subcategoriesRouter.use(authMiddleware)

subcategoriesRouter.get('/', subcategoriesController.index);
subcategoriesRouter.get('/:subcategory_id', subcategoriesController.show);
subcategoriesRouter.get('/:subcategory_id/tasks', tasksSubcategoriesController.index);

subcategoriesRouter.post('/', subcategoriesController.create);
subcategoriesRouter.put('/:subcategory_id', subcategoriesController.update);
subcategoriesRouter.delete('/:subcategory_id', subcategoriesController.delete);

export default subcategoriesRouter;