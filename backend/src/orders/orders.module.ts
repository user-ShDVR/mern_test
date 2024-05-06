import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CartsService } from 'src/carts/carts.service';
import { MailService } from 'src/utils/mailer/mailer';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, MailService, PrismaService, CartsService],
})
export class OrdersModule {}
