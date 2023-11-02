import { IsString, IsNumber, IsArray, IsEnum } from 'class-validator';

enum ProductType {
  hair = "hair",
  beard = "beard",
  shave = "shave",
  certificate = "certificate"
}

export class ProductDTO {

  @IsString()
  name: string;

  @IsNumber()
  rating: number;

  @IsArray()
  cost: number[];

  @IsEnum(ProductType)
  type: ProductType;

  @IsArray()
  extent: number[];

  @IsString()
  about: string;

  @IsArray()
  img: string[];
}
