"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/auth"));

var _CategoriesController = _interopRequireDefault(require("../../../controllers/CategoriesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRouter = (0, _express.Router)();
const categoriesController = new _CategoriesController.default();
categoriesRouter.use(_auth.default);
categoriesRouter.get('/', categoriesController.index);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.put('/:category_id', categoriesController.update);
categoriesRouter.delete('/:category_id', categoriesController.delete);
var _default = categoriesRouter;
exports.default = _default;