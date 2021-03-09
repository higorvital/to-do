"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _TasksRepository = _interopRequireDefault(require("../../modules/tasks/infra/typeorm/repositories/TasksRepository"));

var _CategoriesRepository = _interopRequireDefault(require("../../modules/tasks/infra/typeorm/repositories/CategoriesRepository"));

var _SubcategoriesRepository = _interopRequireDefault(require("../../modules/tasks/infra/typeorm/repositories/SubcategoriesRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('TasksRepository', _TasksRepository.default);

_tsyringe.container.registerSingleton('CategoriesRepository', _CategoriesRepository.default);

_tsyringe.container.registerSingleton('SubcategoriesRepository', _SubcategoriesRepository.default);