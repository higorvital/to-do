"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var typeorm_1 = require("typeorm");
var Task_1 = __importDefault(require("../models/Task"));
var TasksRepository = /** @class */ (function () {
    function TasksRepository() {
        this.ormRepository = typeorm_1.getRepository(Task_1.default);
        this.connection = this.ormRepository.createQueryBuilder("tasks");
    }
    TasksRepository.prototype.create = function (_a) {
        var user_id = _a.user_id, title = _a.title, description = _a.description, date = _a.date, time = _a.time, important = _a.important, subcategory_id = _a.subcategory_id;
        return __awaiter(this, void 0, void 0, function () {
            var task;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        task = this.ormRepository.create({
                            user_id: user_id,
                            title: title,
                            description: description,
                            date: date,
                            time: time,
                            important: important,
                            subcategory_id: subcategory_id
                        });
                        return [4 /*yield*/, this.ormRepository.save(task)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    TasksRepository.prototype.save = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.save(task)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    TasksRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.delete(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.findOne(id)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    TasksRepository.prototype.findByDate = function (_a) {
        var user_id = _a.user_id, day = _a.day, month = _a.month, year = _a.year;
        return __awaiter(this, void 0, void 0, function () {
            var parsedMonth, parsedDay, task_date, tasks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parsedMonth = String(month).padStart(2, '0');
                        parsedDay = String(day).padStart(2, '0');
                        task_date = year + "-" + parsedMonth + "-" + parsedDay;
                        return [4 /*yield*/, this.connection.where('tasks.user_id = :user_id AND tasks.date = :task_date', { user_id: user_id, task_date: task_date }).orderBy('time').getMany()];
                    case 1:
                        tasks = _b.sent();
                        return [2 /*return*/, tasks];
                }
            });
        });
    };
    TasksRepository.prototype.findByTime = function (_a) {
        var user_id = _a.user_id, hour = _a.hour, minute = _a.minute;
        return __awaiter(this, void 0, void 0, function () {
            var parsedHour, parsedMinute, task;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parsedHour = String(hour).padStart(2, '0');
                        parsedMinute = String(minute).padStart(2, '0');
                        return [4 /*yield*/, this.ormRepository.findOne({
                                where: {
                                    user_id: user_id,
                                    time: parsedHour + ":" + parsedMinute + ":00"
                                    // time: Raw(dateFieldName => 
                                    //     `to_char(${dateFieldName}, 'HH:mm:00') = '${parsedHour}:${parsedMinute}:00'
                                    // `)
                                }
                            })];
                    case 1:
                        task = _b.sent();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    TasksRepository.prototype.findByDateTime = function (_a) {
        var user_id = _a.user_id, day = _a.day, month = _a.month, year = _a.year, hour = _a.hour, minute = _a.minute;
        return __awaiter(this, void 0, void 0, function () {
            var parsedDay, parsedMonth, parsedHour, parsedMinute, task;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parsedDay = String(day).padStart(2, '0');
                        parsedMonth = String(month).padStart(2, '0');
                        parsedHour = String(hour).padStart(2, '0');
                        parsedMinute = String(minute).padStart(2, '0');
                        return [4 /*yield*/, this.ormRepository.findOne({
                                where: {
                                    user_id: user_id,
                                    date: year + "-" + parsedMonth + "-" + parsedDay,
                                    //                date: `${parsedDay}-${parsedMonth}-${year}`,
                                    time: parsedHour + ":" + parsedMinute + ":00"
                                }
                            })];
                    case 1:
                        task = _b.sent();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    TasksRepository.prototype.findImportantTasks = function (user_id, completed) {
        return __awaiter(this, void 0, void 0, function () {
            var tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.find({
                            user_id: user_id,
                            important: true,
                            completed: completed
                        })];
                    case 1:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                }
            });
        });
    };
    TasksRepository.prototype.findCompletedTasks = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.where('tasks.user_id = :user_id AND tasks.completed = true', { user_id: user_id }).orderBy('completed_at').getMany()];
                    case 1:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                }
            });
        });
    };
    TasksRepository.prototype.findBySubcategory = function (subcategory_id) {
        return __awaiter(this, void 0, void 0, function () {
            var tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.find({
                            where: {
                                subcategory_id: subcategory_id
                            }
                        })];
                    case 1:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                }
            });
        });
    };
    TasksRepository = __decorate([
        typeorm_1.EntityRepository(Task_1.default),
        __metadata("design:paramtypes", [])
    ], TasksRepository);
    return TasksRepository;
}());
exports.default = TasksRepository;
