"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddUserToTasks1613675326334 = void 0;

var _typeorm = require("typeorm");

class AddUserToTasks1613675326334 {
  async up(queryRunner) {
    await queryRunner.addColumn('tasks', new _typeorm.TableColumn({
      name: 'user_id',
      type: 'uuid',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()'
    }));
    await queryRunner.createForeignKey('tasks', new _typeorm.TableForeignKey({
      name: 'TasksUser',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('tasks', 'TasksUser');
    await queryRunner.dropColumn('tasks', 'user_id');
  }

}

exports.AddUserToTasks1613675326334 = AddUserToTasks1613675326334;