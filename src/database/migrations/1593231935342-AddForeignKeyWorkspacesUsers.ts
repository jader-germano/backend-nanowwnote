import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddForeignKeyWorkspacesUsers1593231935342
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'workspaces',
            new TableColumn({
                name: 'owner_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.createForeignKey(
            'workspaces',
            new TableForeignKey({
                name: 'WorkspaceOwner',
                columnNames: ['owner_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('workspaces', 'WorkspaceOwner');

        await queryRunner.dropColumn('workspaces', 'owner_id');
    }
}
