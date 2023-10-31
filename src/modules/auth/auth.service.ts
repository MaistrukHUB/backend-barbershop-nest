import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from 'src/common/errors/errors';
import { LoginUserDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.userService.createUser(dto);
  }

  async loginUser(dto: LoginUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const userData = {
      // name: existUser.name,
      email: existUser.email,
      role: existUser.role ? existUser.role : 'user',
    };
    const token = await this.tokenService.generationJwtToken(userData);
    const user = await this.userService.publicUser(dto.email);
    return { ...user, token };
  }
}
