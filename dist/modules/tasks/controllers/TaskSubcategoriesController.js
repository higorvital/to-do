"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListTasksBySubcategoryService = _interopRequireDefault(require("../services/ListTasksBySubcategoryService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TasksSubcategoriesController {
  async index(request, response) {
    const {
      subcategory_id
    } = request.params;

    const listTasksBySubcategoryService = _tsyringe.container.resolve(_ListTasksBySubcategoryService.default);

    const tasks = await listTasksBySubcategoryService.execute(request.user.id, subcategory_id);
    return response.status(200).json(tasks);
  }

}

var _default = TasksSubcategoriesController;
exports.default = _default;