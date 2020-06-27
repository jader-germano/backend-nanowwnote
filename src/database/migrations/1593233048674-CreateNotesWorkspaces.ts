import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateNotesWorkspaces1593233048674 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'workspaces_notes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'note_id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'workspace_id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'workspaces_notes',
            new TableForeignKey({
                name: 'NoteWorkspace',
                columnNames: ['note_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'notes',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'workspaces_notes',
            new TableForeignKey({
                name: 'WorkspaceNote',
                columnNames: ['workspace_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'workspaces',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('workspaces_notes', 'WorkspaceNote');

        await queryRunner.dropForeignKey('workspaces_notes', 'NoteWorkspace');

        await queryRunner.dropTable('workspaces_notes');
    }
}
