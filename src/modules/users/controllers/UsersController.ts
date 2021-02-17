import { classToClass } from 'class-transformer';
import {Request, Response} from 'express';
import { container } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

class UsersController {

    async create(request: Request, response: Response){

        const data = request.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6).max(16),
            password_confirmation: Yup.string().required().oneOf([Yup.ref('password')])
        });

        if(!(await schema.isValid(data))){
            throw new AppError("Dados inválidos");
        }

        const {name, email, password} = data;

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute({name, email, password});

        return response.status(200).json(classToClass(user));

    }

    async update(request: Request, response: Response){

        const data = request.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string(),
            // password: Yup.string().when({
            //     is: true,
            //     then: Yup.string().min(6).max(16)
            // }),
            password_confirmation: Yup.string().when('password', {
                is: (val: boolean) => val,
                then: Yup.string().required().oneOf([Yup.ref('password')]).min(6).max(16),
                otherwise: Yup.string()
            }),
            old_password: Yup.string().when('password', {
                is: (val: boolean) => val,
                then: Yup.string().required(),
                otherwise: Yup.string()
            })
        });

        try {
            
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            console.log('asas');
            throw new AppError(error);

        }

        if(!(await schema.isValid(data))){
            throw new AppError("Dados inválidos");
        }

        // const {user_id, name, email, password, old_password, password_confirmation} = data;

        const updateUserService = container.resolve(UpdateUserService);

        const user = await updateUserService.execute({...data, user_id: request.user.id});

        return response.status(200).json(classToClass(user));

    }

}

export default UsersController;