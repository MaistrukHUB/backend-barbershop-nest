import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDTO } from './dto';
import { UserResponse } from './response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createUsers(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.userService.createUser(dto);
  }
}
