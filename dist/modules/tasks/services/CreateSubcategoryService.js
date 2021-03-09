"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICategoriesRepository = _interopRequireDefault(require("../repositories/ICategoriesRepository"));

var _ISubcategoriesRepository = _interopRequireDefault(require("../repositories/ISubcategoriesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateSubcategoryService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SubcategoriesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.default === "undefined" ? Object : _ICategoriesRepository.default, typeof _ISubcategoriesRepository.default === "undefined" ? Object : _ISubcategoriesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateSubcategoryService {
  constructor(categoriesRepository, subcategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
    this.subcategoriesRepository = subcategoriesRepository;
  }

  async execute({
    user_id,
    category_id,
    name
  }) {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new _AppError.default('Essa categoria não existe');
    }

    if (category.user_id !== user_id) {
      throw new _AppError.default('Essa categoria não não pertence a esse usuário');
    }

    const subcategoryExists = await this.subcategoriesRepository.findByNameAndCategory(name, category_id);

    if (subcategoryExists) {
      throw new _AppError.default('Você já tem uma subcategoria com esse nome');
    }

    const subcategory = await this.subcategoriesRepository.create({
      category_id,
      name
    });
    return subcategory;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateSubcategoryService;
exports.default = _default;