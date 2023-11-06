import { ApiProperty } from '@nestjs/swagger';
import { ForeignKey, HasMany } from 'sequelize-typescript';
import { CartProduct } from 'src/modules/cartProduct/models/cartProduct.model';
import { User } from 'src/modules/users/models/user.model';

export class CartDTO {

}
