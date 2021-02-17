import { classToClass } from 'class-transformer';
import {Request, Response} from 'express';
import * as Yup from 'yup';
import { container } from "tsyringe";
import AuthenticateUserService from "../services/AuthenticateUserService";
import AppError from '../../../shared/errors/AppError';

class SessionController {

    async create(request: Request, response: Response){

        const data = request.body;

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })

        if(!(await schema.isValid(data))){
            throw new AppError("Dádos inválidos");
        }

        const {email, password} = data;

        const authenticateUserService = container.resolve(AuthenticateUserService);

        const {user, token} = await authenticateUserService.execute(email, password);

        return response.status(200).json({
            user: classToClass(user),
            token
        });
    }

}

export default SessionController;