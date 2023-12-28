import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsIn,
  IsOptional,
  IsNumber,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  phone: number;

  @ApiProperty()
  @IsEmail({}, { message: 'Невірний формат електронної пошти' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Мінімальна довжина паролю - 8 символів' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]+$/,
    {
      message:
        'Пароль повинен містити принаймні одну малу літеру, одну велику літеру та одну цифру',
    },
  )
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsIn(['user', 'admin'], { message: 'Роль не валідна' })
  role?: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  phone: number;

  @IsEmail({}, { message: 'Невірний формат електронної пошти' })
  email: string;
}
