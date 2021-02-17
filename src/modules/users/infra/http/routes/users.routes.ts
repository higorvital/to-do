import {Router} from 'express';

import UsersController from '../../../controllers/UsersController';
import authMiddleware from '../../../../../shared/infra/http/middlewares/auth'

const usersController = new UsersController();

const userRouter = Router();

userRouter.post('/', usersController.create);
userRouter.use(authMiddleware);
userRouter.put('/', usersController.update);

export default userRouter;