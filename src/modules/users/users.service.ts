import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';

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

  async publicUser(email: string) {
    return this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ['password', 'role'] },
    });
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.userRepository.update(dto, { where: { email } });
    return dto;
  }

  async deleteUsers(email: string) {
    await this.userRepository.destroy({ where: { email } });
    return true;
  }
}
