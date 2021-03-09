"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddCompletedToTask1614796937557 = void 0;

var _typeorm = require("typeorm");

class AddCompletedToTask1614796937557 {
  async up(queryRunner) {
    await queryRunner.addColumn('tasks', new _typeorm.TableColumn({
      name: 'completed',
      type: 'boolean',
      default: false
    }));
    await queryRunner.addColumn('tasks', new _typeorm.TableColumn({
      name: 'completed_at',
      type: 'timestamp',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('tasks', 'completed_at');
    await queryRunner.dropColumn('tasks', 'completed');
  }

}

exports.AddCompletedToTask1614796937557 = AddCompletedToTask1614796937557;