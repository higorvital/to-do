import {Request, Response} from 'express';
import { container } from 'tsyringe';
import ListImportantTasksService from '../services/ListImportantTasksService';
import UpdateTaskImportanceService from '../services/UpdateTaskImportanceService';

class TasksImportanceController{

    async index(request: Request, response: Response){

        const listImportantTasksService = container.resolve(ListImportantTasksService);

        const tasks = await listImportantTasksService.execute(request.user.id);

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