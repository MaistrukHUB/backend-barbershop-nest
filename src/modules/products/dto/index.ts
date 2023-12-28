import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsEnum, IsUrl } from 'class-validator';

enum ProductType {
  hair = 'hair',
  beard = 'beard',
  shave = 'shave',
  certificate = 'certificate',
  toothpaste = 'toothpaste',
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
  @IsUrl({}, { message: 'Недійсний формат посилання для Img ' })
  img: string;
}
