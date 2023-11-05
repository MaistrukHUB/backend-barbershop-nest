import { BadRequestException, Injectable } from '@nestjs/common';
import { CartProduct } from './models/cartProduct.model';
import { InjectModel } from '@nestjs/sequelize';
import { CartProductDTO } from './dto';
import { CreateCartProductResponse } from './response';
import { Cart } from '../cart/models/cart.model';
import { AppError } from 'src/common/errors/errors';

@Injectable()
export class CartProductService {
  constructor(
    @InjectModel(CartProduct)
    private readonly cartProductRepository: typeof CartProduct,
  ) {}

  async createCartProduct(
    cartProductDTO: CartProductDTO[],
    dataCart: Cart,
  ): Promise<CreateCartProductResponse[]> {
    try {
      const createdProducts: CreateCartProductResponse[] = [];
      for (const product of cartProductDTO) {
        const newCartProduct = {
          cart: dataCart.id,
          img: product.img,
          name: product.name,
          category: product.category,
          extent: product.extent,
          count: product.count,
          cost: product.cost,
        };
        const createdProduct =
          await this.cartProductRepository.create(newCartProduct);
        if (!createdProduct)
          throw new BadRequestException(AppError.WRONG_ADDED_CART_PRODUCT);
        createdProducts.push(createdProduct);
      }
      return createdProducts;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteCartProduct(idCart: string): Promise<boolean> {
    try {
      await this.cartProductRepository.destroy({ where: { cart: idCart } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
