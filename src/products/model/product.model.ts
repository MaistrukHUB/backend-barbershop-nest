import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  rating: number;

  @Column
  type: string;

  @Column
  about: string;

  @Column(DataType.ARRAY(DataType.INTEGER))
  cost: number[];

  @Column(DataType.ARRAY(DataType.INTEGER))
  extent: number[];

  @Column(DataType.ARRAY(DataType.STRING))
  img: string[];
}
