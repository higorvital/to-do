"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Category = _interopRequireDefault(require("../models/Category"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CategoriesRepository = (_dec = (0, _typeorm.EntityRepository)(_Category.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class CategoriesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Category.default);
  }

  async create(data) {
    const category = this.ormRepository.create(data);
    await this.ormRepository.save(category);
    return category;
  }

  async findById(id) {
    const category = await this.ormRepository.findOne(id, {
      relations: ['subcategories']
    });
    return category;
  }

  async findByUser(user_id) {
    const categories = await this.ormRepository.find({
      where: {
        user_id
      },
      relations: ['subcategories']
    });
    return categories;
  }

  async delete(id) {
    await this.ormRepository.delete(id);
  }

  async findByNameAndUser(name, user_id) {
    const category = await this.ormRepository.findOne({
      where: {
        name,
        user_id
      },
      relations: ['subcategories']
    });
    return category;
  }

  async save(category) {
    await this.ormRepository.save(category);
    return category;
  }

}, _temp)) || _class) || _class) || _class);
var _default = CategoriesRepository;
exports.default = _default;