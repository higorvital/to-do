import {Request, Response} from 'express';
import { container } from 'tsyringe';
import ListTasksBySubcategoryService from '../services/ListTasksBySubcategoryService';
import * as Yup from 'yup';
import AppError from '../../../shared/errors/AppError';

class TasksSubcategoriesController{

    async index(request: Request, response: Response){

        const {subcategory_id} = request.params;

        const data = request.query;

        const schema = Yup.object().shape({
            day: Yup.number().required(),
            month: Yup.number().required(),
            year: Yup.number().required()
        })

        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const listTasksBySubcategoryService = container.resolve(ListTasksBySubcategoryService);

        const {day, month, year} = request.query;

        const tasks = await listTasksBySubcategoryService.execute(
            {   
                subcategory_id,
                user_id: request.user.id,
                day: Number(day),
                month: Number(month),
                year: Number(year)
            });

        return response.status(200).json(tasks);
    }



}

export default TasksSubcategoriesController;