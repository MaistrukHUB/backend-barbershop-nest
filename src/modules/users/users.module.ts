import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), CartModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Додайте експорт сервісу, якщо він буде використовуватися в інших модулях.
})
export class UserModule {}
