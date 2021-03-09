"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ITasksRepository = _interopRequireDefault(require("../repositories/ITasksRepository"));

var _dateFns = require("date-fns");

var _ISubcategoriesRepository = _interopRequireDefault(require("../repositories/ISubcategoriesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateTaskService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TasksRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SubcategoriesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ITasksRepository.default === "undefined" ? Object : _ITasksRepository.default, typeof _ISubcategoriesRepository.default === "undefined" ? Object : _ISubcategoriesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateTaskService {
  constructor(tasksRepository, subcategoriesRepository) {
    this.tasksRepository = tasksRepository;
    this.subcategoriesRepository = subcategoriesRepository;
  }

  async execute({
    user_id,
    title,
    date,
    time,
    description,
    important,
    subcategory_id
  }) {
    let dateTask = new Date(date.year, date.month - 1, date.day);
    let dateTimeTask = new Date(dateTask);
    let timeTask;

    if (time) {
      const taskTimeUnavailable = await this.tasksRepository.findByDateTime({
        user_id,
        ...date,
        ...time
      });

      if (taskTimeUnavailable) {
        throw new _AppError.default("Horário indisponível");
      }

      timeTask = new Date();
      timeTask.setHours(time.hour);
      timeTask.setMinutes(time.minute);
      timeTask.setSeconds(0);
      dateTimeTask.setHours(time.hour);
      dateTimeTask.setMinutes(time.minute);
    }

    if ((0, _dateFns.isBefore)(dateTimeTask, Date.now())) {
      throw new _AppError.default("Não pode criar uma tarefa em uma data passada");
    }

    if (subcategory_id) {
      const subcategory = await this.subcategoriesRepository.findById(subcategory_id);

      if (!subcategory) {
        throw new _AppError.default("Subcategoria não existe");
      }

      if (subcategory.category.user_id !== user_id) {
        throw new _AppError.default("Essa categoria não pertence a esse usuário");
      }
    }

    const task = await this.tasksRepository.create({
      user_id,
      title,
      date: dateTask,
      time: timeTask,
      description,
      important,
      subcategory_id
    });
    return task;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateTaskService;
exports.default = _default;