import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity('workspaces')
export default class Workspace {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    owner_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @ManyToMany(() => User)
    @JoinColumn({ name: 'users_notes' })
    collaborators: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
