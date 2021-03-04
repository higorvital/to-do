import {Request, Response} from 'express';
import { container } from 'tsyringe';
import ListCompletedTasksService from '../services/ListCompletedTasksService';
import ListTasksBySubcategoryService from '../services/ListTasksBySubcategoryService';
import UpdateTaskCompletedService from '../services/UpdateTaskCompletedService';

class TasksSubcategoriesController{

    async index(request: Request, response: Response){

        const {subcategory_id} = request.params;

        const listTasksBySubcategoryService = container.resolve(ListTasksBySubcategoryService);

        const tasks = await listTasksBySubcategoryService.execute(request.user.id, subcategory_id);

        return response.status(200).json(tasks);
    }



}

export default TasksSubcategoriesController;