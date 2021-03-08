"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("../../../../../shared/infra/http/middlewares/auth"));
var CategoriesController_1 = __importDefault(require("../../../controllers/CategoriesController"));
var categoriesRouter = express_1.Router();
var categoriesController = new CategoriesController_1.default();
categoriesRouter.use(auth_1.default);
categoriesRouter.get('/', categoriesController.index);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.put('/:category_id', categoriesController.update);
categoriesRouter.delete('/:category_id', categoriesController.delete);
exports.default = categoriesRouter;
