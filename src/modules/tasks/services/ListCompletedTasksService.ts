import { inject, injectable } from "tsyringe";
import ITasksRepository from "../repositories/ITasksRepository";
import Task from "../infra/typeorm/models/Task";

interface ListCompletedTasksServiceDTO {
    user_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListCompletedTasksService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ){}

    public async execute({user_id, day, month, year}: ListCompletedTasksServiceDTO): Promise<Task[]>{

        const tasks = await this.tasksRepository.findCompletedTasksByDate({user_id, day, month, year});

        return tasks;

    }
}

export default ListCompletedTasksService;