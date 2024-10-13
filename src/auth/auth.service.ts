import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposirotry: Repository<UserEntity>,
  ) {}
  async hashPassword(password: string) {
    return await hash(password, 12);
  }
  async comperaPassword(password: string, hashedPasswrod: string) {
    return await compare(password, hashedPasswrod);
  }
  async validateUser(args: { email: string; password: string }) {
    const { email, password } = args;
    const user = await this.userReposirotry.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const isValid = await this.comperaPassword(password, user.password);
    if (!isValid) {
      return null;
    }
    return user;
  }
  async login(user: UserEntity) {
    return `logged in ${user.email}`;
  }
}
