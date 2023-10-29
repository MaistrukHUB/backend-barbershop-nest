import { Table, Column, Model } from 'sequelize-typescript';

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
}
