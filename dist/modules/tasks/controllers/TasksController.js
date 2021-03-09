"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var Yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _CreateTaskService = _interopRequireDefault(require("../services/CreateTaskService"));

var _DeleteTaskService = _interopRequireDefault(require("../services/DeleteTaskService"));

var _ListTasksByDateService = _interopRequireDefault(require("../services/ListTasksByDateService"));

var _UpdateTaskService = _interopRequireDefault(require("../services/UpdateTaskService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class TasksController {
  async index(request, response) {
    const data = request.query;
    const schema = Yup.object().shape({
      day: Yup.number().required(),
      month: Yup.number().required(),
      year: Yup.number().required()
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      throw new _AppError.default(error);
    }

    const listTasksByDateService = _tsyringe.container.resolve(_ListTasksByDateService.default);

    const {
      day,
      month,
      year
    } = data;
    const tasks = await listTasksByDateService.execute({
      user_id: request.user.id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.status(200).json(tasks);
  }

  async create(request, response) {
    const data = request.body;
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      date: Yup.object().shape({
        day: Yup.number().required(),
        month: Yup.number().required(),
        year: Yup.number().required()
      }),
      time: Yup.object().shape({
        hour: Yup.number(),
        minute: Yup.number()
      }),
      subcategory_id: Yup.string()
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      throw new _AppError.default(error);
    }

    const createTaskService = _tsyringe.container.resolve(_CreateTaskService.default);

    const task = await createTaskService.execute({
      user_id: request.user.id,
      ...data
    });
    return response.status(200).json(task);
  }

  async update(request, response) {
    const data = request.body;
    const {
      task_id
    } = request.params;
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      date: Yup.object().shape({
        day: Yup.number().required(),
        month: Yup.number().required(),
        year: Yup.number().required()
      }),
      time: Yup.object().shape({
        hour: Yup.number(),
        minute: Yup.number()
      }),
      subcategory_id: Yup.string()
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      throw new _AppError.default(error);
    }

    const updateTaskService = _tsyringe.container.resolve(_UpdateTaskService.default);

    const task = await updateTaskService.execute({
      user_id: request.user.id,
      task_id,
      ...data
    });
    return response.status(200).json(task);
  }

  async delete(request, response) {
    const {
      task_id
    } = request.params;

    const deleteTaskService = _tsyringe.container.resolve(_DeleteTaskService.default);

    await deleteTaskService.execute(request.user.id, task_id);
    return response.status(200).send();
  }

}

var _default = TasksController;
exports.default = _default;