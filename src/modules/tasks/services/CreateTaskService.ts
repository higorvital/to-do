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

interface CreateTaskDTO {
    title: string;
    description?: string;
    date: DateDTO;
    time?: TimeDTO;
    user_id: string;
}

@injectable()
class CreateTaskService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ){}

    public async execute({user_id, title, date, time, description}: CreateTaskDTO): Promise<Task>{

        let dateTask = new Date(date.year, date.month - 1, date.day);
        let dateTimeTask = new Date(dateTask);
        let timeTask;

        if(time){

            const taskTimeUnavailable = await this.tasksRepository.findByTime({user_id, ...time});

            if(taskTimeUnavailable){
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

        const task = await this.tasksRepository.create({user_id, title, date: dateTask, time: timeTask, description});

        return task;

    }

}

export default CreateTaskService;