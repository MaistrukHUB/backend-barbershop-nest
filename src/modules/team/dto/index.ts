import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsEnum, IsUrl } from 'class-validator';

enum TeammateType {
  juniorBarber = 'Молодший баребер',
  barber = 'Барбер',
  seniorBarber = 'Cтарший барбер',
}

export class TeamDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(TeammateType)
  type: TeammateType;

  @ApiProperty()
  @IsString()
  dataStart: string;

  @ApiProperty()
  @IsUrl({}, { message: 'Неправильний формат посилання для img' })
  img: string;

  @ApiProperty()
  @IsUrl({}, { message: 'Неправильний формат посилання для відгуків' })
  linkReviews: string;

  @ApiProperty()
  @IsUrl({}, { message: 'Неправильний формат посилання для створення запису' })
  linkAppointment: string;
}
