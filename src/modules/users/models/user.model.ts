import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Cart } from 'src/modules/cart/models/cart.model';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  phone: number;

  @Column
  email: string;

  @Column
  password: string;

  @Column({
    validate: {
      isIn: [['user', 'admin']],
    },
  })
  role: string;

  @HasMany(() => Cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart: Cart[];
}
