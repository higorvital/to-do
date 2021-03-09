"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("express-async-errors");

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _tasks = _interopRequireDefault(require("../../../../modules/tasks/infra/http/routes/tasks.routes"));

var _categories = _interopRequireDefault(require("../../../../modules/tasks/infra/http/routes/categories.routes"));

var _subcategories = _interopRequireDefault(require("../../../../modules/tasks/infra/http/routes/subcategories.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/tasks', _tasks.default);
routes.use('/categories', _categories.default);
routes.use('/subcategories', _subcategories.default);
var _default = routes;
exports.default = _default;