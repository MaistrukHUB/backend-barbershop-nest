import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from 'src/configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { Product } from '../products/models/product.model';
import { Cart } from '../cart/models/cart.model';
import { CartProduct } from '../cartProduct/models/cartProduct.model';
import { ProductsModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';
import { CartProductModule } from '../cartProduct/cartProduct.module';
import { Price } from '../price/models';
import { PriceModule } from '../price/price.module';
import { Team } from '../team/models';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        dialectModule: require('pg'),
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, Product, Cart, CartProduct, Price, Team],
      }),
    }),
    UserModule,
    AuthModule,
    TokenModule,
    ProductsModule,
    CartModule,
    CartProductModule,
    PriceModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
