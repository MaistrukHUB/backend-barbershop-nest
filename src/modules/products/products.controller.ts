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
import { Product } from './models/product.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({ status: 200, type: Product, isArray: true })
  @Get('get-all')
  getAll(): Promise<Product[]> {
    return this.productsService.getAllProduct();
  }
  @ApiResponse({ status: 200, type: Product })
  @Get('get/:id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @ApiResponse({ status: 200, type: ProductDTO })
  @UseGuards(JwtAdminGuard)
  @Post('create')
  create(@Body() productDTO: ProductDTO): Promise<ProductDTO> {
    return this.productsService.createProduct(productDTO);
  }

  @ApiResponse({ status: 201, type: Boolean })
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.productsService.deleteProduct(id);
  }

  @ApiResponse({ status: 200, type: ProductDTO })
  @UseGuards(JwtAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() ProductDTO: ProductDTO,
  ): Promise<ProductDTO> {
    return this.productsService.updateProduct(id, ProductDTO);
  }
}
