import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDateInTasks1617633235181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'tasks',
            'date',
            new TableColumn({
                name: 'date',
                type: 'date',
                isNullable: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'tasks',
            'date',
            new TableColumn({
                name: 'date',
                type: 'date'
            })
        );
    }

}
