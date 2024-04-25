import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartsProductDto } from './dto/create-carts_product.dto';
import { UpdateCartsProductDto } from './dto/update-carts_product.dto';
import { PrismaService } from 'src/utils/db/prisma.service';

@Injectable()
export class CartsProductsService {
  constructor(private db: PrismaService) {}
  async create(createCartsProductDto: CreateCartsProductDto) {
    await this.db.carts_products.create({ data: { ...createCartsProductDto } });
    return 'Продукт в корзине созддан.';
  }

  async findAll(page: number = 1, limit: number = 16) {
    const offset = (page - 1) * limit;
    const totalCount = await this.db.carts_products.count();
    const carts_products = await this.db.carts_products.findMany({
      take: limit,
      skip: offset,
    });
    return { totalCount, carts_products };
  }

  async findAllByCart(page: number = 1, limit: number = 16) {
    const offset = (page - 1) * limit;
    const totalCount = await this.db.carts_products.count();
    const carts_products = await this.db.carts_products.findMany({
      take: limit,
      skip: offset,
    });
    return { totalCount, carts_products };
  }

  async findOne(id: number) {
    const cart_product = await this.db.carts_products.findFirst({
      where: { id },
    });
    if (!cart_product) {
      throw new NotFoundException('id уазан неверно.');
    }
    return cart_product;
  }

  async update(id: number, updateCartsProductDto: UpdateCartsProductDto) {
    const cart_product = await this.db.carts_products.findFirst({
      where: { cart_id: id, product_id: updateCartsProductDto.product_id },
    });
    if (!cart_product) {
      throw new NotFoundException('id уазан неверно.');
    }
    if (updateCartsProductDto.quantity === 0) {
      await this.db.carts_products.deleteMany({
        where: { cart_id: id, product_id: updateCartsProductDto.product_id },
      });
      return 'Продукт в корзине удалён.';
    }
    await this.db.carts_products.updateMany({
      where: { cart_id: id, product_id: updateCartsProductDto.product_id },
      data: { ...updateCartsProductDto },
    });
    return 'Продукт в корзине обновлен.';
  }

  async remove(id: number, cartId: number) {
    const cart_product = await this.db.carts_products.findFirst({
      where: { product_id: id, cart_id: cartId },
    });
    if (!cart_product) {
      throw new NotFoundException('id уазан неверно.');
    }
    await this.db.carts_products.deleteMany({
      where: { cart_id: cartId, product_id: id },
    });
    return 'Продукт в корзине удалён.';
  }
}
