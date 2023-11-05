import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { AdminJwtStrategy } from 'src/strategy/AdminJwtStrategy';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, AdminJwtStrategy],
  exports: [ProductsService],
})
export class ProductsModule {}