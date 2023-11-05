import { Module } from '@nestjs/common';
import { CartProductService } from './cartProduct.service';
import { CartProductController } from './cartProduct.controller';
import { CartProduct } from './models/cartProduct.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([CartProduct])],
  controllers: [CartProductController],
  providers: [CartProductService],
  exports:[CartProductService]
})
export class CartProductModule {}
