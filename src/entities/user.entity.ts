import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CourseEntity } from './course.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column()
  lastname: string;
  @Column()
  firstname: string;
  @Column()
  password: string;
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
  @OneToMany(() => CourseEntity, (course) => course.author)
  course: CourseEntity[];
}
