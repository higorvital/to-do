import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ITasksRepository from "../repositories/ITasksRepository";
import {isBefore, isSameDay} from 'date-fns';
import Task from "../infra/typeorm/models/Task";
import ISubcategoriesRepository from "../repositories/ISubcategoriesRepository";

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
    date?: DateDTO;
    time?: TimeDTO;
    important?: boolean;
    user_id: string;
    subcategory_id?: string;
}

@injectable()
class CreateTaskService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository,
        @inject('SubcategoriesRepository')
        private subcategoriesRepository: ISubcategoriesRepository
    ){}

    public async execute({user_id, title, date, time, description, important, subcategory_id}: CreateTaskDTO): Promise<Task>{

        if(!date && !subcategory_id){
            throw new AppError("Tarefa precisa ter Subcategoria ou Data");
        }

        let dateTask;
        let timeTask;

        if(date){
            dateTask = new Date(date.year, date.month - 1, date.day);
            let dateTimeTask = new Date(dateTask);
    
            if(time){
    
                const tasksTimeUnavailable = await this.tasksRepository.findNonCompletedByDateTime({user_id, ...date, ...time});
    
                if(tasksTimeUnavailable.length > 0){
                    throw new AppError("Horário indisponível");
                }
    
                timeTask = new Date();
                timeTask.setHours(time.hour);
                timeTask.setMinutes(time.minute);
                timeTask.setSeconds(0);
    
                dateTimeTask.setHours(time.hour);
                dateTimeTask.setMinutes(time.minute);
    
                if(isBefore(dateTimeTask, Date.now())){
                    throw new AppError("Não pode criar uma tarefa em uma data passada");
                }
            } else{
    
                if(isBefore(dateTimeTask, Date.now()) && !isSameDay(dateTimeTask, Date.now())){
                    throw new AppError("Não pode criar uma tarefa em uma data passada");
                }
    
            }
        }



        if(subcategory_id){
            const subcategory = await this.subcategoriesRepository.findById(subcategory_id);

            if(!subcategory){
                throw new AppError("Subcategoria não existe");
            }

            if(subcategory.category.user_id !== user_id){
                throw new AppError("Essa categoria não pertence a esse usuário");
            }
        }

        const task = await this.tasksRepository.create({user_id, title, date: dateTask, time: timeTask, description, important, subcategory_id});

        return task;

    }

}

export default CreateTaskService;