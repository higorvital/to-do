"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("../typeorm");
require("../../container");
var routes_1 = __importDefault(require("./routes"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(routes_1.default);
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.status).json({
            status: "error",
            message: err.message
        });
    }
    else {
        return response.status(500).json({
            status: "error",
            message: err.message
        });
    }
});
app.listen(3333, function () {
    console.log('Servidor iniciado com sucesso!');
});
