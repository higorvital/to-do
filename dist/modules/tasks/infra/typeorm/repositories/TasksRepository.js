"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Task = _interopRequireDefault(require("../models/Task"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let TasksRepository = (_dec = (0, _typeorm.EntityRepository)(_Task.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class TasksRepository {
  constructor() {
    this.ormRepository = void 0;
    this.connection = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Task.default);
    this.connection = this.ormRepository.createQueryBuilder("tasks");
  }

  async create({
    user_id,
    title,
    description,
    date,
    time,
    important,
    subcategory_id
  }) {
    const task = this.ormRepository.create({
      user_id,
      title,
      description,
      date,
      time,
      important,
      subcategory_id
    });
    await this.ormRepository.save(task);
    return task;
  }

  async save(task) {
    await this.ormRepository.save(task);
    return task;
  }

  async delete(id) {
    await this.ormRepository.delete(id);
  }

  async findById(id) {
    const task = await this.ormRepository.findOne(id);
    return task;
  }

  async findByDate({
    user_id,
    day,
    month,
    year
  }) {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0'); // const tasks = await this.ormRepository.find({
    //     where: {
    //         user_id,
    //         date: `${year}-${parsedMonth}-${parsedDay}`
    //     }
    // });

    const task_date = `${year}-${parsedMonth}-${parsedDay}`;
    const tasks = await this.connection.where('tasks.user_id = :user_id AND tasks.date = :task_date', {
      user_id,
      task_date
    }).orderBy('time').getMany();
    return tasks;
  }

  async findByTime({
    user_id,
    hour,
    minute
  }) {
    const parsedHour = String(hour).padStart(2, '0');
    const parsedMinute = String(minute).padStart(2, '0');
    const task = await this.ormRepository.findOne({
      where: {
        user_id,
        time: `${parsedHour}:${parsedMinute}:00` // time: Raw(dateFieldName => 
        //     `to_char(${dateFieldName}, 'HH:mm:00') = '${parsedHour}:${parsedMinute}:00'
        // `)

      }
    });
    return task;
  }

  async findByDateTime({
    user_id,
    day,
    month,
    year,
    hour,
    minute
  }) {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const parsedHour = String(hour).padStart(2, '0');
    const parsedMinute = String(minute).padStart(2, '0');
    const task = await this.ormRepository.findOne({
      where: {
        user_id,
        date: `${year}-${parsedMonth}-${parsedDay}`,
        //                date: `${parsedDay}-${parsedMonth}-${year}`,
        time: `${parsedHour}:${parsedMinute}:00`
      }
    });
    return task;
  }

  async findImportantTasks(user_id, completed) {
    const tasks = await this.ormRepository.find({
      user_id,
      important: true,
      completed
    });
    return tasks;
  }

  async findCompletedTasks(user_id) {
    const tasks = await this.connection.where('tasks.user_id = :user_id AND tasks.completed = true', {
      user_id
    }).orderBy('completed_at').getMany();
    return tasks;
  }

  async findBySubcategory(subcategory_id) {
    const tasks = await this.ormRepository.find({
      where: {
        subcategory_id
      }
    });
    return tasks;
  }

}, _temp)) || _class) || _class) || _class);
var _default = TasksRepository;
exports.default = _default;