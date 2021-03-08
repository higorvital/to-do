"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
var CreateTaskService_1 = __importDefault(require("../services/CreateTaskService"));
var DeleteTaskService_1 = __importDefault(require("../services/DeleteTaskService"));
var ListTasksByDateService_1 = __importDefault(require("../services/ListTasksByDateService"));
var UpdateTaskService_1 = __importDefault(require("../services/UpdateTaskService"));
var TasksController = /** @class */ (function () {
    function TasksController() {
    }
    TasksController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var data, schema, error_1, listTasksByDateService, day, month, year, tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.query;
                        schema = Yup.object().shape({
                            day: Yup.number().required(),
                            month: Yup.number().required(),
                            year: Yup.number().required(),
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(data, {
                                abortEarly: false
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw new AppError_1.default(error_1);
                    case 4:
                        listTasksByDateService = tsyringe_1.container.resolve(ListTasksByDateService_1.default);
                        day = data.day, month = data.month, year = data.year;
                        return [4 /*yield*/, listTasksByDateService.execute({ user_id: request.user.id, day: Number(day), month: Number(month), year: Number(year) })];
                    case 5:
                        tasks = _a.sent();
                        return [2 /*return*/, response.status(200).json(tasks)];
                }
            });
        });
    };
    TasksController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var data, schema, error_2, createTaskService, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.body;
                        schema = Yup.object().shape({
                            title: Yup.string().required(),
                            description: Yup.string(),
                            date: Yup.object().shape({
                                day: Yup.number().required(),
                                month: Yup.number().required(),
                                year: Yup.number().required(),
                            }),
                            time: Yup.object().shape({
                                hour: Yup.number(),
                                minute: Yup.number(),
                            }),
                            subcategory_id: Yup.string()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(data, {
                                abortEarly: false
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw new AppError_1.default(error_2);
                    case 4:
                        createTaskService = tsyringe_1.container.resolve(CreateTaskService_1.default);
                        return [4 /*yield*/, createTaskService.execute(__assign({ user_id: request.user.id }, data))];
                    case 5:
                        task = _a.sent();
                        return [2 /*return*/, response.status(200).json(task)];
                }
            });
        });
    };
    TasksController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var data, task_id, schema, error_3, updateTaskService, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.body;
                        task_id = request.params.task_id;
                        schema = Yup.object().shape({
                            title: Yup.string().required(),
                            description: Yup.string(),
                            date: Yup.object().shape({
                                day: Yup.number().required(),
                                month: Yup.number().required(),
                                year: Yup.number().required(),
                            }),
                            time: Yup.object().shape({
                                hour: Yup.number(),
                                minute: Yup.number(),
                            }),
                            subcategory_id: Yup.string()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(data, {
                                abortEarly: false
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        throw new AppError_1.default(error_3);
                    case 4:
                        updateTaskService = tsyringe_1.container.resolve(UpdateTaskService_1.default);
                        return [4 /*yield*/, updateTaskService.execute(__assign({ user_id: request.user.id, task_id: task_id }, data))];
                    case 5:
                        task = _a.sent();
                        return [2 /*return*/, response.status(200).json(task)];
                }
            });
        });
    };
    TasksController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var task_id, deleteTaskService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        task_id = request.params.task_id;
                        deleteTaskService = tsyringe_1.container.resolve(DeleteTaskService_1.default);
                        return [4 /*yield*/, deleteTaskService.execute(request.user.id, task_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.status(200).send()];
                }
            });
        });
    };
    return TasksController;
}());
exports.default = TasksController;
