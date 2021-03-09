"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var Yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _CreateCategoryService = _interopRequireDefault(require("../services/CreateCategoryService"));

var _DeleteCategoryService = _interopRequireDefault(require("../services/DeleteCategoryService"));

var _ListUserCategories = _interopRequireDefault(require("../services/ListUserCategories"));

var _UpdateCategoryService = _interopRequireDefault(require("../services/UpdateCategoryService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class CategoriesController {
  async index(request, response) {
    const listUserCategoriesService = _tsyringe.container.resolve(_ListUserCategories.default);

    const categories = await listUserCategoriesService.execute(request.user.id);
    return response.status(200).json(categories);
  }

  async create(request, response) {
    const data = request.body;
    const schema = Yup.object({
      name: Yup.string().required()
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      throw new _AppError.default(error);
    }

    const {
      name
    } = data;

    const createCategoryService = _tsyringe.container.resolve(_CreateCategoryService.default);

    const category = await createCategoryService.execute({
      user_id: request.user.id,
      name
    });
    return response.status(200).json(category);
  }

  async delete(request, response) {
    const {
      category_id
    } = request.params;

    const deleteCategoryService = _tsyringe.container.resolve(_DeleteCategoryService.default);

    await deleteCategoryService.execute(request.user.id, category_id);
    return response.status(200).send();
  }

  async update(request, response) {
    const data = request.body;
    const schema = Yup.object({
      name: Yup.string().required()
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      throw new _AppError.default(error);
    }

    const {
      name
    } = data;
    const {
      category_id
    } = request.params;

    const createCategoryService = _tsyringe.container.resolve(_UpdateCategoryService.default);

    const category = await createCategoryService.execute({
      user_id: request.user.id,
      name,
      category_id
    });
    return response.status(200).json(category);
  }

}

var _default = CategoriesController;
exports.default = _default;