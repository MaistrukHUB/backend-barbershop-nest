import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Price } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Price])],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
