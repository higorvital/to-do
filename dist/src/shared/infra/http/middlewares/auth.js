"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("../../../errors/AppError"));
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../../../../config/auth"));
exports.default = (function (request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default("Token não enviado");
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.secret);
        var sub = decoded.sub;
        request.user = {
            id: sub
        };
        return next();
    }
    catch (error) {
        throw new AppError_1.default("Token inválido");
    }
});
