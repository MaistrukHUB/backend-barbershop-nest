import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Price extends Model {
  @Column
  name: string;

  @Column
  cost: number;

  @Column
  isRange: boolean;
}
