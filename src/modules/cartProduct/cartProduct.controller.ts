import { Controller } from '@nestjs/common';
import { CartProductService } from './cartProduct.service';

@Controller('cart-product')
export class CartProductController {
  constructor(private readonly cartProductService: CartProductService) {}
}
