import { Injectable, NotFoundException } from '@nestjs/common';
// import { unlinkSync } from 'fs';
import { PrismaService } from 'src/utils/db/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private db: PrismaService) {}
  async create(file: Express.Multer.File) {
    const image = await this.db.images.create({
      data: {
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
    return image;
  }

  async findOne(id: number) {
    const image = await this.db.images.findFirst({ where: { id } });

    if (!image) {
      throw new NotFoundException('такого изображения не существует.');
    }
    return image;
  }

  async findAll() {
    const totalCount = await this.db.products.count({
      where: { deleted: false },
    });

    if (!totalCount) {
      throw new NotFoundException('No images found');
    }

    const images = await this.db.images.findMany({
      where: { deleted: false },
      orderBy: { id: 'desc' },
    });

    if (!images) {
      throw new NotFoundException('No images found');
    }

    return { images, totalCount };
  }

  async remove(id: number) {
    const image = await this.findOne(id);
    if (!image) {
      throw new NotFoundException('такого изображения не существует.');
    }
    //delete file from uploads folder
    // unlinkSync(`./uploads/${image.filename}`);

    return this.db.images.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
