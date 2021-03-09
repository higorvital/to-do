"use strict";

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("../typeorm");

require("../../container");

var _routes = _interopRequireDefault(require("./routes"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use(_routes.default);
app.use((err, request, response, next) => {
  if (err instanceof _AppError.default) {
    return response.status(err.status).json({
      status: "error",
      message: err.message
    });
  } else {
    return response.status(500).json({
      status: "error",
      message: err.message
    });
  }
});
app.listen(3333, () => {
  console.log('Servidor iniciado com sucessooo!');
});