"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/auth"));

var _TaskCompletedController = _interopRequireDefault(require("../../../controllers/TaskCompletedController"));

var _TaskImportanceController = _interopRequireDefault(require("../../../controllers/TaskImportanceController"));

var _TasksController = _interopRequireDefault(require("../../../controllers/TasksController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tasksController = new _TasksController.default();
const taskImportanceController = new _TaskImportanceController.default();
const taskCompletedController = new _TaskCompletedController.default();
const tasksRouter = (0, _express.Router)();
tasksRouter.use(_auth.default);
tasksRouter.post('/', tasksController.create);
tasksRouter.put('/:task_id', tasksController.update);
tasksRouter.delete('/:task_id', tasksController.delete);
tasksRouter.get('/', tasksController.index);
tasksRouter.get('/completed', taskCompletedController.index);
tasksRouter.get('/important', taskImportanceController.index);
tasksRouter.patch('/:task_id/completed', taskCompletedController.update);
tasksRouter.patch('/:task_id/important', taskImportanceController.update);
var _default = tasksRouter;
exports.default = _default;