import { inject, injectable } from "tsyringe";
import ITasksRepository from "../repositories/ITasksRepository";
import Task from "../infra/typeorm/models/Task";

interface ListImportantTasksServiceDTO {
    user_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListImportantTasksService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ){}

    public async execute({user_id, day, month, year}: ListImportantTasksServiceDTO): Promise<Task[]>{

        const tasks = await this.tasksRepository.findImportantTasksByDate({user_id, day, month, year});

        return tasks;

    }
}

export default ListImportantTasksService;