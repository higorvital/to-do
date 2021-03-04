import 'express-async-errors';
import { Router } from "express";
import UserRouter from "../../../../modules/users/infra/http/routes/users.routes";
import SessionRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import TasksRouter from '../../../../modules/tasks/infra/http/routes/tasks.routes';
import CategoriesRouter from '../../../../modules/tasks/infra/http/routes/categories.routes';
import SubcategoriesRouter from '../../../../modules/tasks/infra/http/routes/subcategories.routes';

const routes = Router();

routes.use('/users', UserRouter);
routes.use('/sessions', SessionRouter);
routes.use('/tasks', TasksRouter);
routes.use('/categories', CategoriesRouter);
routes.use('/subcategories', SubcategoriesRouter);

export default routes;