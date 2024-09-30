import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create({ title, description, authorId, url }: CreateCourseDto) {
    const author = await this.userRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return this.courseRepository.save({
      title,
      description,
      author,
      url,
    });
  }

  async modify(id: number, data: UpdateCourseDto) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.courseRepository.save({
      ...course,
      ...data,
    });
  }

  async delete(id: number) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.courseRepository.remove(course);
  }

  async getOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async getAll() {
    return this.courseRepository.find({
      relations: ['author'],
    });
  }
}
