import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddForeignKeyNotesUsers1593231890457
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'notes',
            new TableColumn({
                name: 'owner_id',
                type: 'uuid',
            }),
        );

        await queryRunner.addColumn(
            'notes',
            new TableColumn({
                name: 'ownerWorkSpace_id',
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'notes',
            new TableForeignKey({
                name: 'NoteOwner',
                columnNames: ['owner_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'notes',
            new TableForeignKey({
                name: 'WorkspaceOwner',
                columnNames: ['ownerWorkSpace_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'workspaces',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('notes', 'NoteOwner');
        await queryRunner.dropForeignKey('notes', 'WorkspaceOwner');

        await queryRunner.dropColumn('notes', 'owner_id');
        await queryRunner.dropColumn('notes', 'ownerWorkSpace_id');
    }
}
