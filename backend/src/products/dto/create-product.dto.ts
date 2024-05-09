import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Santo Stefano Vacanze romane' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'Это вино было создано богами в древнем риме когда фронтенд писали на razor asp.net',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: [
      { key: 'Страна', value: 'Италия', rowKey: '1' },
      { key: 'Артикул', value: 'Santo Stefano', rowKey: '2' },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  characteristics: CharacteristicDto[];

  @ApiProperty({ example: 499 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  image_id: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  type_id: number;
}

class CharacteristicDto {
  id?: number;
  key: string;
  value: string;
  rowKey?: string;
}
