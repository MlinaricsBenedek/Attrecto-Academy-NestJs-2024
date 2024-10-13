import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDTO: CreateUserDTO) {
    try {
      const hashedPasswrod = await hash(createUserDTO.password, 12);
      const user = this.userRepository.save({
        ...createUserDTO,
        password: hashedPasswrod,
      });
      return user;
    } catch (error) {
      throw new BadRequestException();
    }
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
