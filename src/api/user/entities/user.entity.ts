import {  Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Image } from './image.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'int', nullable: false })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    code: string;

    @Column({ type: 'varchar', nullable: false })
    firstname: string;

    @Column({ type: 'varchar', nullable: false })
    secondname: string;

    @Column({ type: 'varchar', nullable: false })
    lastname: string;

    @Column({ type: 'varchar', nullable: false })
    secondlastname: string;

    @Column({ type: 'date', nullable: false })
    hiredate: Date;

    @Column({ type: 'int', nullable: false })
    role_id: number;

    @Column({ type: 'int', nullable: false })
    status_id: number;

    @Column({ type: 'tinyint', nullable: false })
    hr: number;

    @OneToMany(() => Image, (image) => image.user)
    @JoinColumn({name: 'user_id'})
    images: Image[];
}
