"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/auth"));

var _SubcategoriesController = _interopRequireDefault(require("../../../controllers/SubcategoriesController"));

var _TaskSubcategoriesController = _interopRequireDefault(require("../../../controllers/TaskSubcategoriesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subcategoriesRouter = (0, _express.Router)();
const subcategoriesController = new _SubcategoriesController.default();
const tasksSubcategoriesController = new _TaskSubcategoriesController.default();
subcategoriesRouter.use(_auth.default);
subcategoriesRouter.get('/', subcategoriesController.index);
subcategoriesRouter.get('/:subcategory_id/tasks', tasksSubcategoriesController.index);
subcategoriesRouter.post('/', subcategoriesController.create);
subcategoriesRouter.put('/:subcategory_id', subcategoriesController.update);
subcategoriesRouter.delete('/:subcategory_id', subcategoriesController.delete);
var _default = subcategoriesRouter;
exports.default = _default;