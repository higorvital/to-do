import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserToTasks1613675326334 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'tasks',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            })
        );

        await queryRunner.createForeignKey(
            'tasks',
            new TableForeignKey({
                name: 'TasksUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('tasks','TasksUser');
        await queryRunner.dropColumn('tasks', 'user_id');

    }

}
