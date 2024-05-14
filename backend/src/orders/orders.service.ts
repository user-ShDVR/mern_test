import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartsService } from 'src/carts/carts.service';
import { MailService } from 'src/utils/mailer/mailer';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private db: PrismaService,
    private cartsService: CartsService,
    private mailService: MailService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { products, ...orderDetails } = createOrderDto;

    let order;
    try {
      order = await this.db.$transaction(async (prisma) => {
        const createdOrder = await prisma.orders.create({
          data: {
            ...orderDetails,
            order_products: {
              create: products.map((product) => ({
                product_id: product.product_id,
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

        await this.cartsService.clear(orderDetails.user_id);
        return createdOrder;
      });
    } catch (error) {
      throw new Error('Failed to create order: ' + error.message);
    }

    const user = await this.db.users.findUnique({
      where: { id: order.user_id },
    });

    if (!user) throw new Error('User not found.');

    await this.mailService.sendOrderConfirmation(user, order);

    return { order, message: 'Заказ оформлен' };
  }

  async findAllByUser(userId: number, page: number = 1, limit: number = 16) {
    const offset = (page - 1) * limit;
    const totalCount = await this.db.orders.count({
      where: { user_id: userId, deleted: false },
    });
    const orders = await this.db.orders.findMany({
      where: { user_id: userId, deleted: false },
      take: limit,
      skip: offset,
      orderBy: { created: 'desc' },
      include: {
        order_products: {
          include: {
            product: {
              include: { image: true },
            },
          },
        },
      },
    });
    return { totalCount, orders };
  }

  async findAll(page: number = 1, limit: number = 16) {
    const offset = (page - 1) * limit;
    const totalCount = await this.db.orders.count({
      where: { deleted: false },
    });
    const orders = await this.db.orders.findMany({
      where: { deleted: false },
      take: limit,
      skip: offset,
      orderBy: { created: 'desc' },
      include: {
        order_products: {
          include: {
            product: {
              include: { image: true },
            },
          },
        },
      },
    });
    return { totalCount, orders };
  }

  async findOne(id: number) {
    const order = await this.db.orders.findUnique({
      where: { id: id, deleted: false },
      include: {
        order_products: {
          include: {
            product: {
              include: { image: true },
            },
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException('id указан неверно');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { products, ...orderDetails } = updateOrderDto;

    let order;
    try {
      order = await this.db.$transaction(async (prisma) => {
        const createdOrder = await prisma.orders.update({
          where: { id, deleted: false },
          data: {
            ...orderDetails,
            order_products: {
              create: products?.map((product) => ({
                product_id: product.productId,
                quantity: product.quantity,
              })),
            },
          },
          include: {
            order_products: {
              include: {
                product: {
                  include: { image: true },
                },
              },
            },
          },
        });
        return createdOrder;
      });
    } catch (error) {
      throw new Error('Failed to update order: ' + error.message);
    }

    return { order, message: 'Заказ обновлен' };
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('id указан неверно');
    }

    await this.db.orders.update({
      where: { id },
      data: { deleted: true },
    });

    return { message: 'Заказ удален.' };
  }
}
