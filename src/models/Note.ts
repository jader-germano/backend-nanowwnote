
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notes')
export default class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('timestamp with time zone')
    date: Date;

}
