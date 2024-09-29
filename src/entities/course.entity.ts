import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToOne(() => UserEntity, (user) => user.course, { eager: true })
  @JoinColumn({ name: 'id' })
  author: UserEntity;
  @Column()
  description: string;
  @Column()
  url: string;
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
