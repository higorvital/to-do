import {Request, Response} from 'express';
import { container } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import CreateTaskService from '../services/CreateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';
import ListTasksByDateService from '../services/ListTasksByDateService';
import UpdateTaskService from '../services/UpdateTaskService';

class TasksController{

    async index(request: Request, response: Response){

        const data = request.query;

        const schema = Yup.object().shape({
            day: Yup.number().required(),
            month: Yup.number().required(),
            year: Yup.number().required(),
        });


        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const listTasksByDateService = container.resolve(ListTasksByDateService);

        const {day, month, year} = data;

        const tasks = await listTasksByDateService.execute({user_id: request.user.id, day: Number(day), month: Number(month), year: Number(year) });

        return response.status(200).json(tasks);

    }

    async create(request: Request, response: Response){

        const data = request.body;

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string(),
            date: Yup.object().shape({
                day: Yup.number(),
                month: Yup.number(),
                year: Yup.number(),
            }),
            time: Yup.object().shape({
                hour: Yup.number(),
                minute: Yup.number(),
            }),
            subcategory_id: Yup.string()
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
            title: Yup.string(),
            description: Yup.string(),
            subcategory_id: Yup.string().nullable()
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

    async delete(request: Request, response: Response){

        const {task_id} = request.params;

        const deleteTaskService = container.resolve(DeleteTaskService);

        await deleteTaskService.execute(request.user.id, task_id);

        return response.status(200).send();

    }
}

export default TasksController;