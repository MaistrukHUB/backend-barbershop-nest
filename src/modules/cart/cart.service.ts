import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { CartProductDTO } from '../cartProduct/dto';
import { AppError } from 'src/common/errors/errors';
import { CartProductService } from '../cartProduct/cartProduct.service';
import { CartProduct } from '../cartProduct/models/cartProduct.model';
import { User } from '../users/models/user.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private readonly cartRepository: typeof Cart,
    private readonly cartProductService: CartProductService,
  ) {}

  async findCartById(id: string): Promise<Cart> {
    return this.cartRepository.findOne({ where: { id } });
  }

  async createCart(cartProductDTO: CartProductDTO[], user): Promise<Cart> {
    try {
      const newCart = {
        user: user.id,
      };
      const dataCart = await this.cartRepository.create(newCart);
      await this.cartProductService.createCartProduct(cartProductDTO, dataCart);
      const cart = await this.cartRepository.findOne({
        where: { user: user.id, id: dataCart.id },
        include: [
          {
            model: CartProduct,
            required: true,
          },
        ],
      });
      if (!cart) throw new BadRequestException(AppError.WRONG_ADDED_CART);
      return cart;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async deleteCart(id: string): Promise<boolean> {
    try {
      const existProduct = await this.findCartById(id);
      if (!existProduct) throw new BadRequestException(AppError.CART_NOT_EXIST);
      await this.cartRepository.destroy({ where: { id } });
      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async getAll(user): Promise<Cart[]> {
    try {
      const allCart = await this.cartRepository.findAll({
        where: { user: user.id },
        include: [
          {
            model: CartProduct,
            required: true,
          },
        ],
      });
      if (!allCart) throw new BadRequestException(AppError.USER_NOT_HAVE_CART);
      return allCart;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async getCart(id: string, user: User): Promise<Cart> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { id, user: user.id },
        include: [
          {
            model: CartProduct,
            required: true,
          },
        ],
      });
      if (!cart) throw new BadRequestException(AppError.CART_NOT_EXIST);
      return cart;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }
}
