import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workspaces')
export default class Workspace {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('timestamp with time zone')
    date: Date;

}
