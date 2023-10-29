import { IsString, IsIn, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsNumber()
  phone: number;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  @IsIn(['user', 'admin'], { message: 'Invalid role' })
  role?: string;
}
