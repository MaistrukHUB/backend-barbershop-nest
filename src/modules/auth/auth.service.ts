import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from 'src/common/errors/errors';
import { LoginUserDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from '../users/response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) {
        throw new BadRequestException(AppError.USER_EXIST);
      }
      await this.userService.createUser(dto);
      const user = await this.userService.publicUser(dto.email);
      const token = await this.tokenService.generationJwtToken(user);
      return { user, token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async loginUser(dto: LoginUserDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) {
        throw new BadRequestException(AppError.USER_NOT_EXIST);
      }
      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!validatePassword) {
        throw new BadRequestException(AppError.WRONG_DATA);
      }
      const user = await this.userService.publicUser(dto.email);
      const token = await this.tokenService.generationJwtToken(user);
      return { user, token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }
}
