import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { Cart } from '../cart/models/cart.model';
import { CartProduct } from '../cartProduct/models/cartProduct.model';
import { AppError } from 'src/common/errors/errors';
import { CartService } from '../cart/cart.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly cartRepository: CartService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      dto.password = await this.hashPassword(dto.password);
      await this.userRepository.create({
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        password: dto.password,
        role: dto.role ? dto.role : (dto.role = 'user'),
      });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Cart,
            required: false,
            include: [
              {
                model: CartProduct,
                required: false,
              },
            ],
          },
        ],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    try {
      const checkUser = this.findUserByEmail(email);
      if (!checkUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
      await this.userRepository.update(dto, { where: { email } });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUsers(user: User): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email: user.email } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
