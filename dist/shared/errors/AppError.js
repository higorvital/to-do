"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AppError {
  constructor(message, status = 400) {
    this.message = void 0;
    this.status = void 0;
    this.message = message;
    this.status = status;
  }

}

var _default = AppError;
exports.default = _default;