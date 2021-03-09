"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UsersController = _interopRequireDefault(require("../../../controllers/UsersController"));

var _auth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersController = new _UsersController.default();
const userRouter = (0, _express.Router)();
userRouter.post('/', usersController.create);
userRouter.use(_auth.default);
userRouter.put('/', usersController.update);
var _default = userRouter;
exports.default = _default;