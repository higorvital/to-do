"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Subcategory = _interopRequireDefault(require("../models/Subcategory"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SubcategoriesRepository = (_dec = (0, _typeorm.EntityRepository)(_Subcategory.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class SubcategoriesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Subcategory.default);
  }

  async create(data) {
    const subcategory = this.ormRepository.create(data);
    await this.ormRepository.save(subcategory);
    return subcategory;
  }

  async findById(id) {
    const subcategory = await this.ormRepository.findOne(id);
    return subcategory;
  }

  async findByCategory(category_id) {
    const subcategories = await this.ormRepository.find({
      where: {
        category_id
      }
    });
    return subcategories;
  }

  async delete(id) {
    await this.ormRepository.delete(id);
  }

  async findByNameAndCategory(name, category_id) {
    const category = await this.ormRepository.findOne({
      where: {
        name,
        category_id
      }
    });
    return category;
  }

  async save(subcategory) {
    await this.ormRepository.save(subcategory);
    return subcategory;
  }

}, _temp)) || _class) || _class) || _class);
var _default = SubcategoriesRepository;
exports.default = _default;