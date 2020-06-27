import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm';
import User from './User';
import Workspace from './Workspace';

@Entity('notes')
export default class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    owner_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @ManyToMany(() => User)
    @JoinColumn({ name: 'users_notes' })
    collaborators: User;

    @Column()
    ownerWorkSpace_id: string;

    @ManyToOne(() => Workspace)
    @JoinColumn({ name: 'owner_id' })
    ownerWorkSpace: Workspace;

    @ManyToMany(() => Workspace)
    @JoinColumn({ name: 'users_notes' })
    workspacesSharing: Workspace;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
