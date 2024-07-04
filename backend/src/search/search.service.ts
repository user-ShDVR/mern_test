import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/db/prisma.service';

@Injectable()
export class SearchService {
  constructor(private db: PrismaService) {}

  async search(query: string) {
    const products = await this.db.products.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        deleted: true,
        characteristics: true,
        type: true,
        type_id: true,
        image: true,
        image_id: true,
      },
    });

    const types = await this.db.types.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            url: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        url: true,
        deleted: true,
        image: true,
        image_id: true,
      },
    });

    return {
      products,
      types,
    };
  }
}
