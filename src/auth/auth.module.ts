import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LocalStrategy } from './stratergies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TokenStrategy } from './stratergies/token.strategy';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }
  ),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, TokenStrategy],
})
export class AuthModule {}
