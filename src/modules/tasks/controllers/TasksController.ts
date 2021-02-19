import {Request, Response} from 'express';
import { container } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import CreateTaskService from '../services/CreateTaskService';
import UpdateTaskService from '../services/UpdateTaskService';

class TasksController{

    async create(request: Request, response: Response){

        const data = request.body;

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string(),
            date: Yup.object().shape({
                day: Yup.number().required(),
                month: Yup.number().required(),
                year: Yup.number().required(),
            }),
            time: Yup.object().shape({
                hour: Yup.number(),
                minute: Yup.number(),
            })
        });


        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const createTaskService = container.resolve(CreateTaskService);

        const task = await createTaskService.execute({
            user_id: request.user.id,
            ...data
        });

        return response.status(200).json(task);

    }

    async update(request: Request, response: Response){

        const data = request.body;
        const {task_id} = request.params;

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string(),
            date: Yup.object().shape({
                day: Yup.number().required(),
                month: Yup.number().required(),
                year: Yup.number().required(),
            }),
            time: Yup.object().shape({
                hour: Yup.number(),
                minute: Yup.number(),
            })
        });


        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const updateTaskService = container.resolve(UpdateTaskService);

        const task = await updateTaskService.execute({
            user_id: request.user.id,
            task_id,
            ...data
        });

        return response.status(200).json(task);

    }
}

export default TasksController;