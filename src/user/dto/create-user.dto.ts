import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  password: string;
}
