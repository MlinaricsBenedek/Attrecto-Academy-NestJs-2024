import { IsArray, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { AssignCourseDto } from '../../course/dto/create-course.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @MinLength(6)
  password: string;

  @Type(() => AssignCourseDto)
  @IsArray()
  @IsOptional()
  enrolledCourses: AssignCourseDto[];
}
