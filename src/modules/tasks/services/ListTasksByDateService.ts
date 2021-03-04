import { inject, injectable } from "tsyringe";
import ITasksRepository from "../repositories/ITasksRepository";
import Task from "../infra/typeorm/models/Task";

interface ListTasksByDateDTO {
    day: number;
    month: number;
    year: number;
    user_id: string;
}

@injectable()
class ListTasksByDateService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ){}

    public async execute({user_id, day, month, year}: ListTasksByDateDTO): Promise<Task[]>{

        const tasks = await this.tasksRepository.findByDate({day, month, year, user_id});

        return tasks;

    }

}

export default ListTasksByDateService;