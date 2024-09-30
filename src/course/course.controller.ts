import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() body: CreateCourseDto) {
    return this.courseService.create(body);
  }

  @Put(':id')
  update(@Body() body: UpdateCourseDto, @Param('id') id: number) {
    return this.courseService.modify(id, body);
  }

  @Get()
  getAll() {
    return this.courseService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.courseService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.courseService.delete(id);
  }
}
