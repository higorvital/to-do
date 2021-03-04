import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddImportantToTask1614797453286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'tasks',
            new TableColumn({
                name: 'important',
                type: 'boolean',
                default: false
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tasks', 'important');
    }
}
