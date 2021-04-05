import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ITasksRepository from "../repositories/ITasksRepository";
import Task from "../infra/typeorm/models/Task";
import { parseISO } from "date-fns";

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

        if(task.completed && task.time){

            const taskDate = String(task.date).split('-');
            const taskTime = String(task.time).split(':');

            const taskDateTime = {
                day: Number(taskDate[2]),
                month: Number(taskDate[1]),
                year: Number(taskDate[0]),
                hour: Number(taskTime[0]),
                minute: Number(taskTime[1])
            }

            const tasksTimeUnavailable = await this.tasksRepository.findNonCompletedByDateTime({user_id, ...taskDateTime});
            
            if(tasksTimeUnavailable.length > 0 && tasksTimeUnavailable[0].id !== task.id){
                throw new AppError("Horário indisponível");
            }

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