import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseEntity } from './entities/course.entity';
import { UserEntity } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [CourseEntity, UserEntity],
      synchronize: true,
    }),
    CourseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
