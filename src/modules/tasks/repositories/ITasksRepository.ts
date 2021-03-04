import ICreateTask from "../dtos/ICreateTask";
import IFindTasksByDate from "../dtos/IFindTasksByDate";
import IFindTaskByTime from "../dtos/IFindTaskByTime";
import Task from "../infra/typeorm/models/Task";
import IFindTasksByDateTime from "../dtos/IFindTasksByDateTime";

interface ITasksRepository{

    create(data: ICreateTask): Promise<Task>;
    save(task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Task | undefined>;
    findByDate(data: IFindTasksByDate): Promise<Task[]>;
    findByTime(data: IFindTaskByTime): Promise<Task | undefined>
    findByDateTime(data: IFindTasksByDateTime): Promise<Task | undefined>
    findImportantTasks(user_id: string, completed: boolean): Promise<Task[]>;
    findCompletedTasks(user_id: string): Promise<Task[]>;
    findBySubcategory(subcategory_id: string): Promise<Task[]>;

}

export default ITasksRepository;