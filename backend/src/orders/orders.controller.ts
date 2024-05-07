import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/utils/guards/admin.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(
    @Query('id') id: number = 1,
    @Query('page') page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 16,
  ) {
    return this.ordersService.findAllByUser(+id, page, limit);
  }

  @Get('admin')
  @UseGuards(AdminGuard)
  async findAllAdmin(
    @Query('page') page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 16,
  ) {
    return this.ordersService.findAll(page, limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
