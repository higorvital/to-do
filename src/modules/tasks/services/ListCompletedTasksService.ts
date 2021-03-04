import { inject, injectable } from "tsyringe";
import ITasksRepository from "../repositories/ITasksRepository";
import Task from "../infra/typeorm/models/Task";

@injectable()
class ListCompletedTasksService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ){}

    public async execute(user_id: string): Promise<Task[]>{

        const tasks = await this.tasksRepository.findCompletedTasks(user_id);

        return tasks;

    }
}

export default ListCompletedTasksService;