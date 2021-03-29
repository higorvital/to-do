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
            include_completed: Yup.boolean()
        })

        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {

            throw new AppError(error);
        }

        const listTasksBySubcategoryService = container.resolve(ListTasksBySubcategoryService);

        let {include_completed} = request.query;

        let completed = false;

        if(include_completed) {
            completed = Boolean(include_completed);
        }

        const tasks = await listTasksBySubcategoryService.execute(
            {   
                subcategory_id,
                user_id: request.user.id,
                include_completed: completed
            }
        );

        return response.status(200).json(tasks);
    }

}

export default TasksSubcategoriesController;