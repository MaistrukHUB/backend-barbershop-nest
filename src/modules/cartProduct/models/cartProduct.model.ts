import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Cart } from 'src/modules/cart/models/cart.model';

@Table
export class CartProduct extends Model {
  @ForeignKey(() => Cart)
  cart: Cart;

  @Column
  img: string;

  @Column
  name: string;

  @Column
  category: string;

  @Column
  extent: number;

  @Column
  count: number;

  @Column
  cost: number;
}
