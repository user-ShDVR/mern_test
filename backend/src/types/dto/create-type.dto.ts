import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTypeDto {
  @ApiProperty({ example: 'Вино' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  image_id: number;
  @ApiProperty({ example: 'vines' })
  @IsNotEmpty()
  @IsString()
  url: string;
}
