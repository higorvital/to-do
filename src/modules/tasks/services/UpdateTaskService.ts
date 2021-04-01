import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ITasksRepository from "../repositories/ITasksRepository";
import {isBefore, isSameDay} from 'date-fns';
import Task from "../infra/typeorm/models/Task";
import ISubcategoriesRepository from "../repositories/ISubcategoriesRepository";

interface UpdateTaskDTO {
    title: string;
    description?: string;
    user_id: string;
    task_id: string;
    subcategory_id?: string;
}

@injectable()
class UpdateTaskService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository,
        @inject('SubcategoriesRepository')
        private subcategoriesRepository: ISubcategoriesRepository
    ){}

    public async execute({user_id, task_id, title, description, subcategory_id}: UpdateTaskDTO): Promise<Task>{

        let task = await this.tasksRepository.findById(task_id);
        
        if(!task){
            throw new AppError("Tarefa não existe");
        }

        if(task.user_id !== user_id){
            throw new AppError("Tarefa não pertence a esse usuário");
        }

        let subcategory;

        if(subcategory_id){
            subcategory = await this.subcategoriesRepository.findById(subcategory_id);

            if(!subcategory){
                throw new AppError("Subcategoria não existe");
            }

            if(subcategory.category.user_id !== user_id){
                throw new AppError("Essa categoria não pertence a esse usuário");
            }
        }

        Object.assign(task, {
           title,
           description,
           subcategory,
           subcategory_id
        });

        task = await this.tasksRepository.save(task);

        return task;

    }

}

export default UpdateTaskService;