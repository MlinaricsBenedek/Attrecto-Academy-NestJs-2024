import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { CourseEntity } from 'src/entities/course.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseEntity: Repository<CourseEntity>,
  ) {}
  async create({ email, firstName, lastName, password }) {
    return this.userRepository.save({ email, firstName, lastName, password });
  }
  async getOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async modify(id: number, data: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });
    if (user == null) {
      throw new NotFoundException('User not found!');
    }
    return this.userRepository.save({
      ...user,
      ...data,
    });
  }
  async delete(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('The user doesnt exist');
    }
    return this.userRepository.remove(user);
  }
  async getAll() {
    return this.userRepository.find();
  }
}
