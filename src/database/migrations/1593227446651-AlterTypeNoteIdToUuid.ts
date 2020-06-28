import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTypeNoteIdToUuid1593227446651
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('notes', 'date');

        await queryRunner.dropColumn('notes', 'id');

        await queryRunner.addColumn(
            'notes',
            new TableColumn({
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            }),
        );

        await queryRunner.addColumn(
            'notes',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'notes',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('notes', 'updated_at');

        await queryRunner.dropColumn('notes', 'created_at');

        await queryRunner.dropColumn('notes', 'id');

        await queryRunner.addColumn(
            'notes',
            new TableColumn({
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            }),
        );

        await queryRunner.addColumn(
            'notes',
            new TableColumn({
                name: 'date',
                type: 'timestamp with time zone',
                isNullable: false,
            }),
        );
    }
}
