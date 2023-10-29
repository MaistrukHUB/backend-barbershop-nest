import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { AppError } from 'src/common/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  // async deleteUsersByEmail(email: string) {
  //   const users = await this.userRepository.findAll({ where: { email } });
  // }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.findUserByEmail(dto.email);
    console.log(existUser);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
      password: dto.password,
      role: dto.role ? dto.role : (dto.role = 'user'),
    });
    return dto;
  }
}
