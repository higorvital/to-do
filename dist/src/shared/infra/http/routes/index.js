"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
var express_1 = require("express");
var users_routes_1 = __importDefault(require("../../../../modules/users/infra/http/routes/users.routes"));
var sessions_routes_1 = __importDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));
var tasks_routes_1 = __importDefault(require("../../../../modules/tasks/infra/http/routes/tasks.routes"));
var categories_routes_1 = __importDefault(require("../../../../modules/tasks/infra/http/routes/categories.routes"));
var subcategories_routes_1 = __importDefault(require("../../../../modules/tasks/infra/http/routes/subcategories.routes"));
var routes = express_1.Router();
routes.use('/users', users_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
routes.use('/tasks', tasks_routes_1.default);
routes.use('/categories', categories_routes_1.default);
routes.use('/subcategories', subcategories_routes_1.default);
exports.default = routes;
