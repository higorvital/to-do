"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTasks1613606446302 = void 0;

var _typeorm = require("typeorm");

class CreateTasks1613606446302 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'tasks',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'title',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'text',
        isNullable: true
      }, {
        name: 'date',
        type: 'date'
      }, {
        name: 'time',
        type: 'time',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('tasks');
  }

}

exports.CreateTasks1613606446302 = CreateTasks1613606446302;