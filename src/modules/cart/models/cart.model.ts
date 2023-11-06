import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { CartProduct } from 'src/modules/cartProduct/models/cartProduct.model';
import { User } from 'src/modules/users/models/user.model';

@Table
export class Cart extends Model {
  @ForeignKey(() => User)
  user: User;

  @HasMany(() => CartProduct, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cartProducts: CartProduct[];
}
