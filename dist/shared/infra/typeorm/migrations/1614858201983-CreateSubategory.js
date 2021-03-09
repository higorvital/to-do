"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSubategory1614858201983 = void 0;

var _typeorm = require("typeorm");

class CreateSubategory1614858201983 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'subcategories',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'category_id',
        type: 'uuid'
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
    await queryRunner.createForeignKey('subcategories', new _typeorm.TableForeignKey({
      name: 'SubcategoryCategory',
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('subcategories', 'SubcategoryCategory');
    await queryRunner.dropTable('subcategories');
  }

}

exports.CreateSubategory1614858201983 = CreateSubategory1614858201983;