import {Request, Response} from 'express';
import { container } from 'tsyringe';
import ListImportantTasksService from '../services/ListImportantTasksService';
import UpdateTaskImportanceService from '../services/UpdateTaskImportanceService';
import * as Yup from 'yup';
import AppError from '../../../shared/errors/AppError';

class TasksImportanceController{

    async index(request: Request, response: Response){

        const data = request.query;

        const schema = Yup.object().shape({
            day: Yup.number().required(),
            month: Yup.number().required(),
            year: Yup.number().required()
        });

        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const listImportantTasksService = container.resolve(ListImportantTasksService);

        const {day, month, year} = request.query;

        const tasks = await listImportantTasksService.execute({user_id: request.user.id, day: Number(day), month: Number(month), year: Number(year)});

        return response.status(200).json(tasks);
    }

    async update(request: Request, response: Response){

        const {task_id} = request.params;

        const updateTaskImportanceService = container.resolve(UpdateTaskImportanceService);

        const task = await updateTaskImportanceService.execute({
            user_id: request.user.id,
            task_id,
        });

        return response.status(200).json(task);

    }


}

export default TasksImportanceController;