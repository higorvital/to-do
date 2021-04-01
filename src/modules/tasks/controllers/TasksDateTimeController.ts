import {Request, Response} from 'express';
import { container } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import UpdateTaskDateTimeService from '../services/UpdateTaskDateTimeService';

class TasksDateTimeController{


    async update(request: Request, response: Response){

        const data = request.body;
        const {task_id} = request.params;

        const schema = Yup.object().shape({
            date: Yup.object().shape({
                day: Yup.number(),
                month: Yup.number(),
                year: Yup.number(),
            }),
            time: Yup.object().shape({
                hour: Yup.number(),
                minute: Yup.number(),
            }),
        });


        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const updateTaskDateTimeService = container.resolve(UpdateTaskDateTimeService);

        const task = await updateTaskDateTimeService.execute({
            user_id: request.user.id,
            task_id,
            ...data
        });

        return response.status(200).json(task);

    }

}

export default TasksDateTimeController;