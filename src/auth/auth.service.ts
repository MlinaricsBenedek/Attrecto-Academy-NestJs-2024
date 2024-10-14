import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await hash(password, 12);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }

  async validateUser(args: { email: string; password: string }) {
    const { email, password } = args;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const isValid = await this.comparePassword(password, user.password);
    if (!isValid) {
      return null;
    }
    return user;
  }

  async login(user: UserEntity) {
    const payload = {
      sub: user.id,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }
}
