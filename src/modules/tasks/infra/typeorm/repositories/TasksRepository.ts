import { EntityRepository, getRepository, Raw, Repository } from "typeorm";
import ICreateTask from "../../../dtos/ICreateTask";
import IFindTasksByTime from "../../../dtos/IFindTaskByTime";
import IFindTasksByDate from "../../../dtos/IFindTasksByDate";
import ITasksRepository from "../../../repositories/ITasksRepository";
import Task from "../models/Task";

@EntityRepository(Task)
class TasksRepository implements ITasksRepository{

    private ormRepository: Repository<Task>;

    constructor(){
        this.ormRepository = getRepository(Task);
    }

    public async create({user_id, title, description, date, time}: ICreateTask){

        const task = this.ormRepository.create({
            user_id,
            title,
            description,
            date,
            time
        });

        await this.ormRepository.save(task);

        return task;

    }

    public async save(task: Task){
        
        await this.ormRepository.save(task);

        return task;
    }

    public async delete(id: string){
        await this.ormRepository.delete(id);
    }

    public async findById(id: string){
        const task = await this.ormRepository.findOne(id);

        return task;
    }

    public async findByDate({user_id, day, month, year}: IFindTasksByDate){

        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');

        const tasks = await this.ormRepository.find({
            where: {
                user_id,
                date: `${parsedDay}-${parsedMonth}-${year}`
                // date: Raw(dateFieldName => `
                //     to_char(${dateFieldName}), 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'
                // `)
            }
        });

        return tasks;

    }
    
    public async findByTime({user_id, hour, minute}: IFindTasksByTime){

        const parsedHour = String(hour).padStart(2, '0');
        const parsedMinute = String(minute).padStart(2, '0');

        const task = await this.ormRepository.findOne({
            where: {
                user_id,
                time: `${parsedHour}:${parsedMinute}:00`
                // time: Raw(dateFieldName => 
                //     `to_char(${dateFieldName}, 'HH:mm:00') = '${parsedHour}:${parsedMinute}:00'
                // `)
            }
        });
        
        return task;

    }

    public async findByDateTime({user_id, day, month, year}: IFindTasksByDate,{hour, minute}: IFindTasksByTime){

        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');
        const parsedHour = String(hour).padStart(2, '0');
        const parsedMinute = String(minute).padStart(2, '0');

        const task = await this.ormRepository.findOne({
            where: {
                user_id,
                date: `${parsedDay}-${parsedMonth}-${year}`,
                time: `${parsedHour}:${parsedMinute}:00`
            }
        });

        return task;

    }


}

export default TasksRepository;