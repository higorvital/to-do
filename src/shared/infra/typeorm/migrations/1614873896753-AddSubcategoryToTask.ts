import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddSubcategoryToTask1614873896753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'tasks',
            new TableColumn({
                name: 'subcategory_id',
                type: 'uuid',
                isNullable: true
            })
        )

        await queryRunner.createForeignKey(
            'tasks',
            new TableForeignKey({
                name: 'TaskSubcategory',
                columnNames: ['subcategory_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'subcategories',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('tasks', 'TaskSubcategory');
        await queryRunner.dropColumn('tasks', 'subcategory_id');

    }

}
