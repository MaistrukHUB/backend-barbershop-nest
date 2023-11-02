import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDTO } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { AppError } from 'src/common/errors/errors';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
  ) {}

  async findProductByEmail(name: string) {
    return this.productRepository.findOne({ where: { name } });
  }
  async findProductById(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }

  async createProduct(dto: ProductDTO): Promise<ProductDTO> {
    const newProduct = { ...dto };
    const existProduct = await this.findProductByEmail(newProduct.name);
    if (existProduct) throw new BadRequestException(AppError.PRODUCT_EXIST);
    if (newProduct.extent.length !== newProduct.cost.length)
      throw new BadRequestException(AppError.VOLUME_PRICE_MISMATCH_ERROR);
    await this.productRepository.create(newProduct);
    return newProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const existProduct = await this.findProductById(id);
    if (!existProduct)
      throw new BadRequestException(AppError.PRODUCT_NOT_EXIST);
    await this.productRepository.destroy({ where: { id } });
    return true;
  }

  async getAllProduct(): Promise<Product[]> {
    const allProduct = this.productRepository.findAll();
    if (!allProduct) throw new BadRequestException(AppError.PRODUCTS_NOT_EXIST)
    return allProduct
  }
}
