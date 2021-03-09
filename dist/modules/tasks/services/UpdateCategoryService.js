"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICategoriesRepository = _interopRequireDefault(require("../repositories/ICategoriesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateCategoryService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.default === "undefined" ? Object : _ICategoriesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateCategoryService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({
    user_id,
    category_id,
    name
  }) {
    let categoryExists = await this.categoriesRepository.findByNameAndUser(name, user_id);

    if (categoryExists && categoryExists.id !== category_id) {
      throw new _AppError.default('Você já tem uma categoria com esse nome');
    }

    let category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new _AppError.default('Categoria não existe');
    }

    category.name = name;
    category = await this.categoriesRepository.save(category);
    return category;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateCategoryService;
exports.default = _default;