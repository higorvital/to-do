import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ITasksRepository from "../repositories/ITasksRepository";
import {isBefore} from 'date-fns';
import Task from "../infra/typeorm/models/Task";

interface TimeDTO {
    hour: number;
    minute: number;
}

interface DateDTO{
    day: number;
    month: number;
    year: number;
}

interface UpdateTaskDTO {
    title: string;
    description?: string;
    date: DateDTO;
    time?: TimeDTO;
    user_id: string;
    task_id: string;
}

@injectable()
class UpdateTaskService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ){}

    public async execute({user_id, task_id, title, date, time, description}: UpdateTaskDTO): Promise<Task>{

        let task = await this.tasksRepository.findById(task_id);
        
        if(!task){
            throw new AppError("Tarefa não existe");
        }

        if(task.user_id !== user_id){
            throw new AppError("Tarefa não pertence a esse usuário");
        }

        let dateTask = new Date(date.year, date.month - 1, date.day);
        let dateTimeTask = new Date(dateTask);
        let timeTask = null;

        if(time){

            const taskTimeUnavailable = await this.tasksRepository.findByTime({user_id, ...time});

            if(taskTimeUnavailable && taskTimeUnavailable.id !== task.id){
                throw new AppError("Horário indisponível");
            }

            timeTask = new Date();
            timeTask.setHours(time.hour);
            timeTask.setMinutes(time.minute);
            timeTask.setSeconds(0);

            dateTimeTask.setHours(time.hour);
            dateTimeTask.setMinutes(time.minute);
        }

        if(isBefore(dateTimeTask, Date.now())){
            throw new AppError("Não pode criar uma tarefa em uma data passada");
        }

        Object.assign(task, {
           title,
           description,
           date: dateTask,
           time: timeTask, 
        });

        task = await this.tasksRepository.save(task);

        return task;

    }

}

export default UpdateTaskService;