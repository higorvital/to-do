"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var Yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _CreateSubcategoryService = _interopRequireDefault(require("../services/CreateSubcategoryService"));

var _DeleteSubcategoryService = _interopRequireDefault(require("../services/DeleteSubcategoryService"));

var _ListCategorySubcategories = _interopRequireDefault(require("../services/ListCategorySubcategories"));

var _UpdateSubcategoryService = _interopRequireDefault(require("../services/UpdateSubcategoryService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class SubcategoriesController {
  async index(request, response) {
    const data = request.query;
    const schema = Yup.object({
      category: Yup.string().required()
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      throw new _AppError.default(error);
    }

    const {
      category
    } = data;

    const listCategorySubcategoriesService = _tsyringe.container.resolve(_ListCategorySubcategories.default);

    const subcategories = await listCategorySubcategoriesService.execute(String(category), request.user.id);
    return response.status(200).json(subcategories);
  }

  async create(request, response) {
    const data = request.body;
    const schema = Yup.object({
      name: Yup.string().required(),
      category_id: Yup.string().required()
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      throw new _AppError.default(error);
    }

    const {
      name,
      category_id
    } = data;

    const createSubcategoryService = _tsyringe.container.resolve(_CreateSubcategoryService.default);

    const subcategory = await createSubcategoryService.execute({
      user_id: request.user.id,
      category_id,
      name
    });
    return response.status(200).json(subcategory);
  }

  async delete(request, response) {
    const {
      subcategory_id
    } = request.params;

    const deleteSubcategoryService = _tsyringe.container.resolve(_DeleteSubcategoryService.default);

    await deleteSubcategoryService.execute({
      user_id: request.user.id,
      subcategory_id
    });
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
      subcategory_id
    } = request.params;

    const updateSubcategoryService = _tsyringe.container.resolve(_UpdateSubcategoryService.default);

    const subcategory = await updateSubcategoryService.execute({
      user_id: request.user.id,
      name,
      subcategory_id
    });
    return response.status(200).json(subcategory);
  }

}

var _default = SubcategoriesController;
exports.default = _default;