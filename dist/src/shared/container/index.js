"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("../../modules/users/providers");
var UsersRepository_1 = __importDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));
var TasksRepository_1 = __importDefault(require("../../modules/tasks/infra/typeorm/repositories/TasksRepository"));
var CategoriesRepository_1 = __importDefault(require("../../modules/tasks/infra/typeorm/repositories/CategoriesRepository"));
var SubcategoriesRepository_1 = __importDefault(require("../../modules/tasks/infra/typeorm/repositories/SubcategoriesRepository"));
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.default);
tsyringe_1.container.registerSingleton('TasksRepository', TasksRepository_1.default);
tsyringe_1.container.registerSingleton('CategoriesRepository', CategoriesRepository_1.default);
tsyringe_1.container.registerSingleton('SubcategoriesRepository', SubcategoriesRepository_1.default);
