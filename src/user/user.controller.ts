import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/course/dto/create-user.dto';
import { UpdateUserDTO } from 'src/course/dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }
  @Put(':id')
  update(@Body() body: UpdateUserDTO, @Param('id') id: number) {
    return this.userService.modify(id, body);
  }
  @Delete('id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.getOne(id);
  }
  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
