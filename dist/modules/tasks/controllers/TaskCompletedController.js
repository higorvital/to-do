"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListCompletedTasksService = _interopRequireDefault(require("../services/ListCompletedTasksService"));

var _UpdateTaskCompletedService = _interopRequireDefault(require("../services/UpdateTaskCompletedService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TasksCompletedController {
  async index(request, response) {
    const listCompletedTasksService = _tsyringe.container.resolve(_ListCompletedTasksService.default);

    const tasks = await listCompletedTasksService.execute(request.user.id);
    return response.status(200).json(tasks);
  }

  async update(request, response) {
    const {
      task_id
    } = request.params;

    const updateTaskCompletedService = _tsyringe.container.resolve(_UpdateTaskCompletedService.default);

    const task = await updateTaskCompletedService.execute({
      user_id: request.user.id,
      task_id
    });
    return response.status(200).json(task);
  }

}

var _default = TasksCompletedController;
exports.default = _default;