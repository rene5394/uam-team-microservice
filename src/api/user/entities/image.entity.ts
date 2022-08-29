import {  Column, Entity, JoinColumn ,ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('image')
export class Image {
  @PrimaryColumn({ type: 'int', nullable: false })
    id: number;

    @Column({ type: 'blob', nullable: false })
    image: any;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user: User;
}
