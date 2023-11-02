import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './dto';
import { JwtAdminGuard } from 'src/guards/role-guard';
import { Product } from './model/product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAllProduct();
  }

  @UseGuards(JwtAdminGuard)
  @Post('create')
  create(@Body() productDTO: ProductDTO): Promise<ProductDTO> {
    return this.productsService.createProduct(productDTO);
  }
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.productsService.deleteProduct(id);
  }

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() ProductDTO: ProductDTO) {
  //   return this.productsService.update(+id, ProductDTO);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
