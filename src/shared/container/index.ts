import IUsersRepository from "../../modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";

import '../../modules/users/providers';

import UsersRepository from "../../modules/users/infra/typeorm/repositories/UsersRepository";
import ITasksRepository from "../../modules/tasks/repositories/ITasksRepository";
import TasksRepository from "../../modules/tasks/infra/typeorm/repositories/TasksRepository";
import ICategoriesRepository from "../../modules/tasks/repositories/ICategoriesRepository";
import CategoriesRepository from "../../modules/tasks/infra/typeorm/repositories/CategoriesRepository";
import ISubcategoriesRepository from "../../modules/tasks/repositories/ISubcategoriesRepository";
import SubcategoriesRepository from "../../modules/tasks/infra/typeorm/repositories/SubcategoriesRepository";

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<ITasksRepository>(
    'TasksRepository',
    TasksRepository
);

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<ISubcategoriesRepository>(
    'SubcategoriesRepository',
    SubcategoriesRepository
);