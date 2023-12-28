import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class PriceDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Поле назва не повино бути порожні' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Вартість не повино бути порожнім' })
  @IsNumber({}, { message: 'Вартість повинна бути числовим значенням' })
  @Min(1, { message: 'Вартість повинна бути більшою за 0' })
  cost: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Поле діапазон має бути заповненим' })
  @IsBoolean({ message: 'Діапазон повинна бути булевим значенням' })
  isRange: boolean;
}
