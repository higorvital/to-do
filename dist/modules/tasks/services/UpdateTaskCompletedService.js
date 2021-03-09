"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ITasksRepository = _interopRequireDefault(require("../repositories/ITasksRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateTaskCompletedService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TasksRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ITasksRepository.default === "undefined" ? Object : _ITasksRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateTaskCompletedService {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute({
    user_id,
    task_id
  }) {
    let task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new _AppError.default("Tarefa não existe");
    }

    if (task.user_id !== user_id) {
      throw new _AppError.default("Tarefa não pertence a esse usuário");
    }

    task.completed = !task.completed;

    if (task.completed) {
      task.completed_at = new Date();
    } else {
      task.completed_at = null;
    }

    task = await this.tasksRepository.save(task);
    return task;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateTaskCompletedService;
exports.default = _default;