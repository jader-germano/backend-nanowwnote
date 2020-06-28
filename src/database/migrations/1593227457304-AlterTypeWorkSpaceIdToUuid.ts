import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTypeWorkSpaceIdToUuid1593227457304
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('workspaces', 'date');

        await queryRunner.dropColumn('workspaces', 'id');

        await queryRunner.addColumn(
            'workspaces',
            new TableColumn({
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            }),
        );

        await queryRunner.addColumn(
            'workspaces',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'workspaces',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('workspaces', 'updated_at');

        await queryRunner.dropColumn('workspaces', 'created_at');

        await queryRunner.dropColumn('workspaces', 'id');

        await queryRunner.addColumn(
            'workspaces',
            new TableColumn({
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            }),
        );

        await queryRunner.addColumn(
            'workspaces',
            new TableColumn({
                name: 'date',
                type: 'timestamp with time zone',
                isNullable: false,
            }),
        );
    }
}
