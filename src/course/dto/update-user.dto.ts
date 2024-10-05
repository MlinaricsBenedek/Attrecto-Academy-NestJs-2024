import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  password: string;
}
