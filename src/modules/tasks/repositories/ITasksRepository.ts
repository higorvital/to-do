import ICreateTask from "../dtos/ICreateTask";
import IFindTasksByDate from "../dtos/IFindTasksByDate";
import IFindTaskByTime from "../dtos/IFindTaskByTime";
import Task from "../infra/typeorm/models/Task";

interface ITasksRepository{

    create(data: ICreateTask): Promise<Task>;
    save(task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Task | undefined>;
    findByDate(data: IFindTasksByDate): Promise<Task[]>;
    findByTime(data: IFindTaskByTime): Promise<Task | undefined>
    findByDateTime(date: IFindTasksByDate,time: IFindTaskByTime): Promise<Task | undefined>

}

export default ITasksRepository;