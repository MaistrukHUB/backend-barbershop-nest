import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsEnum, IsUrl } from 'class-validator';

export class CartProductDTO {
  @ApiProperty({
    example: 'Category Name',
    description: 'id продукту в корзині',
  })
  @IsString()
  idCartProduct: string;

  @ApiProperty({ example: 'Category Name', description: 'id продукту ' })
  @IsString()
  idProduct: string;

  @ApiProperty({
    example: 'product.jpg',
    description: 'Шлях до зображення товару',
  })
  @IsUrl({}, { message: 'Неправильний формат посилання для img' })
  img: string;

  @ApiProperty({ example: 'Product Name', description: 'Назва товару' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Category Name', description: 'Назва категорії' })
  @IsString()
  type: string;

  @ApiProperty({ example: 0.5, description: 'Кількість товару' })
  @IsNumber()
  extent: number;

  @ApiProperty({ example: 2, description: 'Кількість одиниць товару' })
  @IsNumber()
  count: number;

  @ApiProperty({ example: 25.99, description: 'Ціна товару' })
  @IsNumber()
  cost: number;
}
