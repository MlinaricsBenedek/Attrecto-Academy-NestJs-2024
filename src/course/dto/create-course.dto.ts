import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  authorId: number;

  @IsString()
  url: string;
}

export class AssignCourseDto {
  @IsInt()
  @IsPositive()
  id: number;
}