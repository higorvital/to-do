"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddSubcategoryToTask1614873896753 = void 0;

var _typeorm = require("typeorm");

class AddSubcategoryToTask1614873896753 {
  async up(queryRunner) {
    await queryRunner.addColumn('tasks', new _typeorm.TableColumn({
      name: 'subcategory_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('tasks', new _typeorm.TableForeignKey({
      name: 'TaskSubcategory',
      columnNames: ['subcategory_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'subcategories',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('tasks', 'TaskSubcategory');
    await queryRunner.dropColumn('tasks', 'subcategory_id');
  }

}

exports.AddSubcategoryToTask1614873896753 = AddSubcategoryToTask1614873896753;