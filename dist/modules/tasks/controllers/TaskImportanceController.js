"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListImportantTasksService = _interopRequireDefault(require("../services/ListImportantTasksService"));

var _UpdateTaskImportanceService = _interopRequireDefault(require("../services/UpdateTaskImportanceService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TasksImportanceController {
  async index(request, response) {
    const listImportantTasksService = _tsyringe.container.resolve(_ListImportantTasksService.default);

    const tasks = await listImportantTasksService.execute(request.user.id);
    return response.status(200).json(tasks);
  }

  async update(request, response) {
    const {
      task_id
    } = request.params;

    const updateTaskImportanceService = _tsyringe.container.resolve(_UpdateTaskImportanceService.default);

    const task = await updateTaskImportanceService.execute({
      user_id: request.user.id,
      task_id
    });
    return response.status(200).json(task);
  }

}

var _default = TasksImportanceController;
exports.default = _default;