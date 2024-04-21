import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ImagesService } from 'src/images/images.service';
import { TypesService } from 'src/types/types.service';

@Injectable()
export class ProductsService {
  constructor(
    private db: PrismaService,
    private imagesService: ImagesService,
    private typesService: TypesService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const image = await this.imagesService.findOne(createProductDto.image_id);
    if (!image) {
      throw new NotFoundException('Такого изображения не существует.');
    }
    const type = await this.typesService.findOne(createProductDto.type_id);
    if (!type) {
      throw new NotFoundException('Такого типа не существует.');
    }
    await this.db.products.create({ data: { ...createProductDto } });
    return 'Продукт создан.';
  }

  async findAll(
    page: number = 1,
    limit: number = 16,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
    sortOrder?: string,
    type?: string,
  ) {
    const offset = (page - 1) * limit;
    const whereClause: any = { deleted: false };

    // Include type filter if provided
    if (type) {
      whereClause.type = {
        url: type,
      };
    }

    // Price range filter
    if (minPrice !== undefined && maxPrice !== undefined) {
      whereClause.price = {
        gte: minPrice,
        lte: maxPrice,
      };
    }

    // Sorting logic
    const orderBy = {};
    if (sortBy && sortOrder) {
      orderBy[sortBy] = sortOrder;
    }

    // Fetching total count of products based on filters
    const totalCount = await this.db.products.count({
      where: whereClause,
    });

    // Fetching products with all applied filters and pagination
    const products = await this.db.products.findMany({
      where: whereClause,
      take: limit,
      skip: offset,
      orderBy: orderBy,
      include: {
        image: true,
        type: true,
      },
    });

    return { totalCount, products };
  }

  async findOne(id: number) {
    const product = await this.db.products.findFirst({ where: { id } });
    if (!product) {
      throw new NotFoundException('id указан неверно.');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const image = await this.imagesService.findOne(updateProductDto.image_id);
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('id указан неправильно.');
    }
    if (!image) {
      throw new NotFoundException('image указан неправильно.');
    }
    const updatedProduct = await this.db.products.update({
      where: { id },
      data: { ...updateProductDto },
    });
    return updatedProduct;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('id указан неправильно.');
    }

    product.deleted = await true;

    return 'Продукт удалён.';
  }
}
