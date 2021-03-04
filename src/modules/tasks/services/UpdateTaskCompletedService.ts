import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ITasksRepository from "../repositories/ITasksRepository";
import Task from "../infra/typeorm/models/Task";

interface UpdateTaskDTO {
    user_id: string;
    task_id: string;
}

@injectable()
class UpdateTaskCompletedService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ){}

    public async execute({user_id, task_id}: UpdateTaskDTO): Promise<Task>{

        let task = await this.tasksRepository.findById(task_id);
        
        if(!task){
            throw new AppError("Tarefa não existe");
        }

        if(task.user_id !== user_id){
            throw new AppError("Tarefa não pertence a esse usuário");
        }

        task.completed = !task.completed;

        if(task.completed){
            task.completed_at = new Date();
        }else{
            task.completed_at = null;

        }

        task = await this.tasksRepository.save(task);

        return task;

    }

}

export default UpdateTaskCompletedService;