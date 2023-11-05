import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsEnum } from 'class-validator';

enum ProductType {
  hair = 'hair',
  beard = 'beard',
  shave = 'shave',
  certificate = 'certificate',
}

export class ProductDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsArray()
  cost: number[];

  @ApiProperty()
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty()
  @IsArray()
  extent: number[];

  @ApiProperty()
  @IsString()
  about: string;

  @ApiProperty()
  @IsArray()
  img: string[];
}
