import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CartsService } from 'src/carts/carts.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, CartsService],
})
export class OrdersModule {}
