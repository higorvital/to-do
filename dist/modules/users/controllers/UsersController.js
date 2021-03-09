"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var Yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _CreateUserService = _interopRequireDefault(require("../services/CreateUserService"));

var _UpdateUserService = _interopRequireDefault(require("../services/UpdateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class UsersController {
  async create(request, response) {
    const data = request.body;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6).max(16),
      password_confirmation: Yup.string().required().oneOf([Yup.ref('password')])
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
      email,
      password
    } = data;

    const createUserService = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUserService.execute({
      name,
      email,
      password
    });
    return response.status(200).json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    const data = request.body;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string(),
      password_confirmation: Yup.string().when('password', {
        is: val => val,
        then: Yup.string().required().oneOf([Yup.ref('password')]).min(6).max(16),
        otherwise: Yup.string()
      }),
      old_password: Yup.string().when('password', {
        is: val => val,
        then: Yup.string().required(),
        otherwise: Yup.string()
      })
    });

    try {
      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      throw new _AppError.default(error);
    } // const {user_id, name, email, password, old_password, password_confirmation} = data;


    const updateUserService = _tsyringe.container.resolve(_UpdateUserService.default);

    const user = await updateUserService.execute({ ...data,
      user_id: request.user.id
    });
    return response.status(200).json((0, _classTransformer.classToClass)(user));
  }

}

var _default = UsersController;
exports.default = _default;