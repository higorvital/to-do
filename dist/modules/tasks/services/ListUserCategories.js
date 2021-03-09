"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICategoriesRepository = _interopRequireDefault(require("../repositories/ICategoriesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListUserCategoriesService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.default === "undefined" ? Object : _ICategoriesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListUserCategoriesService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(user_id) {
    const categories = await this.categoriesRepository.findByUser(user_id);
    return categories;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListUserCategoriesService;
exports.default = _default;