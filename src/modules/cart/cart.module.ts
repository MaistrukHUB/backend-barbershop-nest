import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './models/cart.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartProductModule } from '../cartProduct/cartProduct.module';

@Module({
  imports: [SequelizeModule.forFeature([Cart]), CartProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
