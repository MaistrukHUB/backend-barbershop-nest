import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDTO } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
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
    try {
      const newProduct = { ...dto };
      const existProduct = await this.findProductByEmail(newProduct.name);
      if (existProduct) throw new BadRequestException(AppError.PRODUCT_EXIST);
      if (newProduct.extent.length !== newProduct.cost.length)
        throw new BadRequestException(AppError.VOLUME_PRICE_MISMATCH_ERROR);
      await this.productRepository.create(newProduct);
      return newProduct;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const existProduct = await this.findProductById(id);
      if (!existProduct)
        throw new BadRequestException(AppError.PRODUCT_NOT_EXIST);
      await this.productRepository.destroy({ where: { id } });
      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async getAllProduct(
    selectedCategory?: string,
    searchValue?: string,
  ): Promise<Product[]> {
    try {
      let filteredProducts: Product[] = await this.productRepository.findAll();
  
      // Фільтруємо за selectedCategory, якщо він не пустий
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(
          (product) => product.type === selectedCategory,
        );
      }
  
      // Фільтруємо за searchValue, якщо він не пустий
      if (searchValue) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
      }
  
      if (filteredProducts.length === 0) {
        throw new BadRequestException(AppError.PRODUCTS_NOT_EXIST);
      }
  
      return filteredProducts;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const product = await this.findProductById(id);
      if (!product)
        throw new BadRequestException(AppError.PRODUCT_ID_NOT_EXIST);
      return product;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async updateProduct(id: string, dto: ProductDTO): Promise<ProductDTO> {
    const sequelize = this.productRepository.sequelize;
    await sequelize.transaction(async (t) => {
      const checkProductExist = await this.productRepository.findOne({
        where: { id },
        transaction: t,
      });
      if (!checkProductExist) {
        throw new BadRequestException(AppError.PRODUCT_ID_NOT_EXIST);
      }
      const originalProduct = await this.productRepository.findOne({
        where: { id },
        transaction: t,
      });
      await this.productRepository.update(dto, {
        where: { id },
        transaction: t,
      });
      const existProducts = await this.productRepository.findAll({
        where: { name: dto.name },
        transaction: t,
      });
      if (existProducts.length > 1) {
        throw new BadRequestException(AppError.PRODUCT_EXIST);
      }
    });

    return dto;
  }
}
