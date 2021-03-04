import { inject, injectable } from "tsyringe";
import ITasksRepository from "../repositories/ITasksRepository";
import Task from "../infra/typeorm/models/Task";

@injectable()
class ListImportantTasksService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ){}

    public async execute(user_id: string): Promise<Task[]>{

        const tasks = await this.tasksRepository.findImportantTasks(user_id, false);

        return tasks;

    }
}

export default ListImportantTasksService;