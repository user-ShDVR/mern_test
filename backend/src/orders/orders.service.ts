import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartsService } from 'src/carts/carts.service';
import { MailService } from 'src/utils/mailer/mailer';

@Injectable()
export class OrdersService {
  constructor(
    private db: PrismaService,
    private cartsService: CartsService,
    private mailService: MailService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { products, ...orderDetails } = createOrderDto;

    const result = await this.db.$transaction(async (prisma) => {
      const order = await prisma.orders.create({
        data: {
          ...orderDetails,
          order_products: {
            create: products.map((product) => ({
              product_id: product.productId,
              quantity: product.quantity,
            })),
          },
        },
        include: {
          order_products: {
            include: {
              product: true,
            },
          },
        },
      });

      await this.cartsService.clear(order.user_id);

      const user = await prisma.users.findUnique({
        where: { id: order.user_id },
      });

      if (!user) throw new Error('User not found.');

      await this.mailService.sendOrderConfirmation(user, order);

      return order;
    });

    return { order: result, message: 'Заказ оформлен' };
  }

  async findAllByUser(userId: number, page: number = 1, limit: number = 16) {
    const offset = (page - 1) * limit;
    const totalCount = await this.db.orders.count();
    const orders = await this.db.orders.findMany({
      where: { user_id: userId },
      take: limit,
      skip: offset,
      include: {
        order_products: {
          include: {
            product: true,
          },
        },
      },
    });
    return { totalCount, orders };
  }

  async findOne(id: number) {
    const order = await this.db.orders.findUnique({
      where: { id },
      include: {
        order_products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException('id указан неверно');
    }
    return order;
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('id указан неверно');
    }
    await this.db.orders.delete({ where: { id } });
    return 'Покупка удалена.';
  }
}
