"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ITasksRepository = _interopRequireDefault(require("../repositories/ITasksRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListCompletedTasksService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TasksRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ITasksRepository.default === "undefined" ? Object : _ITasksRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListCompletedTasksService {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute(user_id) {
    const tasks = await this.tasksRepository.findCompletedTasks(user_id);
    return tasks;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListCompletedTasksService;
exports.default = _default;