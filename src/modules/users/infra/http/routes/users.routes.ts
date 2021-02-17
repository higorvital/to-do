import UsersController from '../../../controllers/UsersController';
import {Router} from 'express';

const usersController = new UsersController();

const userRouter = Router();

userRouter.post('/', usersController.create);

export default userRouter;