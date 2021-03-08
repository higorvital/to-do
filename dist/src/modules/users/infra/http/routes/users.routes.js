"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UsersController_1 = __importDefault(require("../../../controllers/UsersController"));
var auth_1 = __importDefault(require("../../../../../shared/infra/http/middlewares/auth"));
var usersController = new UsersController_1.default();
var userRouter = express_1.Router();
userRouter.post('/', usersController.create);
userRouter.use(auth_1.default);
userRouter.put('/', usersController.update);
exports.default = userRouter;
