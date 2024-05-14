import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface OrderProductItem {
  product_id: number;
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  summary: number;
  @ApiProperty({ example: 'address' })
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty({ example: [{ productId: 1, quantity: 1 }] })
  @IsNotEmpty()
  products: OrderProductItem[];
}
