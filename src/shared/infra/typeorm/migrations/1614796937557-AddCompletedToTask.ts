import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCompletedToTask1614796937557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'tasks',
            new TableColumn({
                name: 'completed',
                type: 'boolean',
                default: false
            })
        );

        await queryRunner.addColumn(
            'tasks',
            new TableColumn({
                name: 'completed_at',
                type: 'timestamp',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tasks', 'completed_at');
        await queryRunner.dropColumn('tasks', 'completed');
    }

}
