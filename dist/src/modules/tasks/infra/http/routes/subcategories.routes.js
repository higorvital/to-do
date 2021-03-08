"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("../../../../../shared/infra/http/middlewares/auth"));
var SubcategoriesController_1 = __importDefault(require("../../../controllers/SubcategoriesController"));
var TaskSubcategoriesController_1 = __importDefault(require("../../../controllers/TaskSubcategoriesController"));
var subcategoriesRouter = express_1.Router();
var subcategoriesController = new SubcategoriesController_1.default();
var tasksSubcategoriesController = new TaskSubcategoriesController_1.default();
subcategoriesRouter.use(auth_1.default);
subcategoriesRouter.get('/', subcategoriesController.index);
subcategoriesRouter.get('/:subcategory_id/tasks', tasksSubcategoriesController.index);
subcategoriesRouter.post('/', subcategoriesController.create);
subcategoriesRouter.put('/:subcategory_id', subcategoriesController.update);
subcategoriesRouter.delete('/:subcategory_id', subcategoriesController.delete);
exports.default = subcategoriesRouter;
