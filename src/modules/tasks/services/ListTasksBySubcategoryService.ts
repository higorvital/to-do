import { inject, injectable } from "tsyringe";
import ITasksRepository from "../repositories/ITasksRepository";
import Task from "../infra/typeorm/models/Task";
import AppError from "../../../shared/errors/AppError";
import ISubcategoriesRepository from "../repositories/ISubcategoriesRepository";

interface ListTasksBySubcategoryServiceDTO {
    user_id: string;
    subcategory_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListTasksBySubcategoryService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository,
        @inject('SubcategoriesRepository')
        private subcategoriesRepository: ISubcategoriesRepository
    ){}

    public async execute({user_id, subcategory_id, day, month, year}:ListTasksBySubcategoryServiceDTO): Promise<Task[]>{

        let subcategory = await this.subcategoriesRepository.findById(subcategory_id);

        if(!subcategory){
            throw new AppError('Essa subcategoria não existe');
        }

        const {category} = subcategory;

        if(!category){
            throw new AppError('Essa categoria não existe');
        }

        if(category.user_id !== user_id){
            throw new AppError('Essa categoria não não pertence a esse usuário');
        }


        const tasks = await this.tasksRepository.findBySubcategoryAndDate({subcategory_id, day, month, year});

        return tasks;

    }
}

export default ListTasksBySubcategoryService;