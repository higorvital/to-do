"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddImportantToTask1614797453286 = void 0;

var _typeorm = require("typeorm");

class AddImportantToTask1614797453286 {
  async up(queryRunner) {
    await queryRunner.addColumn('tasks', new _typeorm.TableColumn({
      name: 'important',
      type: 'boolean',
      default: false
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('tasks', 'important');
  }

}

exports.AddImportantToTask1614797453286 = AddImportantToTask1614797453286;