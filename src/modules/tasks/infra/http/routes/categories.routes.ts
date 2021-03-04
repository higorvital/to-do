import { Router } from "express";
import authMiddleware from "../../../../../shared/infra/http/middlewares/auth";
import CategoriesController from "../../../controllers/CategoriesController";

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.use(authMiddleware)

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.put('/:category_id', categoriesController.update);
categoriesRouter.delete('/:category_id', categoriesController.delete);

export default categoriesRouter;