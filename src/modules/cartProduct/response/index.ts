import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray } from 'class-validator';
import { Cart } from 'src/modules/cart/models/cart.model';

export class CreateCartProductResponse {
  @ApiProperty({ type: () => Cart })
  cart: Cart;

  @ApiProperty()
  @IsString()
  img: string;

  @ApiProperty()
  @IsString()
  idCartProduct: string;

  @ApiProperty()
  @IsString()
  idProduct: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  extent: number;

  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsNumber()
  cost: number;
}
