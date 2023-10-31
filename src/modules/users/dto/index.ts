import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsIn, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  phone: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsIn(['user', 'admin'], { message: 'Invalid role' })
  role?: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  phone: number;

  @ApiProperty()
  @IsString()
  email: string;

}
