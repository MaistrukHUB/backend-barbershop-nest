import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartProductDTO } from '../cartProduct/dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './models/cart.model';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, type: Cart })
  @Post('create')
  create(
    @Body() cartProductDTO: CartProductDTO[],
    @Req() request,
  ): Promise<Cart> {
    const user = request.user;
    return this.cartService.createCart(cartProductDTO, user);
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: Boolean })
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.cartService.deleteCart(id);
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: Boolean })
  @UseGuards(JwtAuthGuard)
  @Get('get-all')
  getAll(@Req() request): Promise<Cart[]> {
    const user = request.user;
    return this.cartService.getAll(user);
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: Boolean })
  @UseGuards(JwtAuthGuard)
  @Get('get-cart/:id')
  getCart(@Param('id') id: string, @Req() request): Promise<Cart> {
    const user = request.user;
    return this.cartService.getCart(id, user);
  }
}
