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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
var date_fns_1 = require("date-fns");
var CreateTaskService = /** @class */ (function () {
    function CreateTaskService(tasksRepository, subcategoriesRepository) {
        this.tasksRepository = tasksRepository;
        this.subcategoriesRepository = subcategoriesRepository;
    }
    CreateTaskService.prototype.execute = function (_a) {
        var user_id = _a.user_id, title = _a.title, date = _a.date, time = _a.time, description = _a.description, important = _a.important, subcategory_id = _a.subcategory_id;
        return __awaiter(this, void 0, void 0, function () {
            var dateTask, dateTimeTask, timeTask, taskTimeUnavailable, subcategory, task;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dateTask = new Date(date.year, date.month - 1, date.day);
                        dateTimeTask = new Date(dateTask);
                        if (!time) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tasksRepository.findByDateTime(__assign(__assign({ user_id: user_id }, date), time))];
                    case 1:
                        taskTimeUnavailable = _b.sent();
                        if (taskTimeUnavailable) {
                            throw new AppError_1.default("Horário indisponível");
                        }
                        timeTask = new Date();
                        timeTask.setHours(time.hour);
                        timeTask.setMinutes(time.minute);
                        timeTask.setSeconds(0);
                        dateTimeTask.setHours(time.hour);
                        dateTimeTask.setMinutes(time.minute);
                        _b.label = 2;
                    case 2:
                        if (date_fns_1.isBefore(dateTimeTask, Date.now())) {
                            throw new AppError_1.default("Não pode criar uma tarefa em uma data passada");
                        }
                        if (!subcategory_id) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.subcategoriesRepository.findById(subcategory_id)];
                    case 3:
                        subcategory = _b.sent();
                        if (!subcategory) {
                            throw new AppError_1.default("Subcategoria não existe");
                        }
                        if (subcategory.category.user_id !== user_id) {
                            throw new AppError_1.default("Essa categoria não pertence a esse usuário");
                        }
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.tasksRepository.create({ user_id: user_id, title: title, date: dateTask, time: timeTask, description: description, important: important, subcategory_id: subcategory_id })];
                    case 5:
                        task = _b.sent();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    CreateTaskService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject('TasksRepository')),
        __param(1, tsyringe_1.inject('SubcategoriesRepository')),
        __metadata("design:paramtypes", [Object, Object])
    ], CreateTaskService);
    return CreateTaskService;
}());
exports.default = CreateTaskService;
