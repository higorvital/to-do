import {Request, Response} from 'express';
import { container } from 'tsyringe';
import ListCompletedTasksService from '../services/ListCompletedTasksService';
import UpdateTaskCompletedService from '../services/UpdateTaskCompletedService';

class TasksCompletedController{

    async index(request: Request, response: Response){

        const listCompletedTasksService = container.resolve(ListCompletedTasksService);

        const tasks = await listCompletedTasksService.execute(request.user.id);

        return response.status(200).json(tasks);
    }

    async update(request: Request, response: Response){

        const {task_id} = request.params;

        const updateTaskCompletedService = container.resolve(UpdateTaskCompletedService);

        const task = await updateTaskCompletedService.execute({
            user_id: request.user.id,
            task_id,
        });

        return response.status(200).json(task);

    }


}

export default TasksCompletedController;