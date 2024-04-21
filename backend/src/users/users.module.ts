import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CartsService } from 'src/carts/carts.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CartsService],
  exports: [UsersService],
})
export class UsersModule {}
