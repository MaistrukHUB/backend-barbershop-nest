import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Team extends Model<Team> {
  @Column
  name: string;

  @Column
  dataStart: string;

  @Column
  type: string;

  @Column
  img: string;

  @Column
  linkReviews: string;

  @Column
  linkAppointment: string;
}
