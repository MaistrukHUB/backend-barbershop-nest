import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Cart } from 'src/modules/cart/models/cart.model';
import { CreateCartProductResponse } from 'src/modules/cartProduct/response';

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

export class AuthUserResponse {
  @ApiProperty({ type: UserResponse })
  user: UserResponse;

  @ApiProperty()
  @IsString()
  token: string;

}
