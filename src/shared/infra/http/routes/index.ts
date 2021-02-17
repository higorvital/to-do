import 'express-async-errors';
import { Router } from "express";
import UserRouter from "../../../../modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use('/users', UserRouter);

export default routes;