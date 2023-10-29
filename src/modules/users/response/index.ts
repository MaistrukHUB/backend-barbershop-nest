import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserResponse {
  @ApiProperty()
  @IsNumber()
  phone: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;
}

// export class AuthUserResponse {
//   @ApiProperty()
//   user: UserResponse;

//   @ApiProperty()
//   @IsString()
//   token: string;
// }
