import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ITasksRepository from "../repositories/ITasksRepository";

@injectable()
class DeleteTaskService{

    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ){}

    public async execute(user_id: string,task_id: string): Promise<void>{

        let task = await this.tasksRepository.findById(task_id);
        
        if(!task){
            throw new AppError("Tarefa não existe");
        }

        if(task.user_id !== user_id){
            throw new AppError("Essa tarefa não pertence a esse usuário");
        }

        await this.tasksRepository.delete(task_id);

    }

}

export default DeleteTaskService;