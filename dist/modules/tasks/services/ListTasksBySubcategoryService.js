"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ITasksRepository = _interopRequireDefault(require("../repositories/ITasksRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ISubcategoriesRepository = _interopRequireDefault(require("../repositories/ISubcategoriesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListTasksBySubcategoryService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TasksRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SubcategoriesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ITasksRepository.default === "undefined" ? Object : _ITasksRepository.default, typeof _ISubcategoriesRepository.default === "undefined" ? Object : _ISubcategoriesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListTasksBySubcategoryService {
  constructor(tasksRepository, subcategoriesRepository) {
    this.tasksRepository = tasksRepository;
    this.subcategoriesRepository = subcategoriesRepository;
  }

  async execute(user_id, subcategory_id) {
    let subcategory = await this.subcategoriesRepository.findById(subcategory_id);

    if (!subcategory) {
      throw new _AppError.default('Essa subcategoria não existe');
    }

    const {
      category
    } = subcategory;

    if (!category) {
      throw new _AppError.default('Essa categoria não existe');
    }

    if (category.user_id !== user_id) {
      throw new _AppError.default('Essa categoria não não pertence a esse usuário');
    }

    const tasks = await this.tasksRepository.findBySubcategory(subcategory_id);
    return tasks;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListTasksBySubcategoryService;
exports.default = _default;