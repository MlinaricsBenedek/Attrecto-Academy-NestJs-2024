import { IsNumber, IsString } from 'class-validator';

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
