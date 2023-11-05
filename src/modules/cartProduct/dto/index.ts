import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsEnum } from 'class-validator';


export class CartProductDTO {

  @ApiProperty({ example: 'product.jpg', description: 'Шлях до зображення товару' })
  @IsString()
  img: string;

  @ApiProperty({ example: 'Product Name', description: 'Назва товару' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Category Name', description: 'Назва категорії' })
  @IsString()
  category: string;

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