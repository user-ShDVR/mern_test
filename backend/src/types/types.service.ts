import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaService } from 'src/utils/db/prisma.service';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class TypesService {
  constructor(
    private db: PrismaService,
    private imagesService: ImagesService,
  ) {}
  async create(createTypeDto: CreateTypeDto) {
    const image = await this.imagesService.findOne(createTypeDto.image_id);
    const type = await this.findOneByUrl(createTypeDto.url);
    if (!image) {
      throw new NotFoundException('Такого изображения не существует.');
    }
    if (type) {
      throw new NotFoundException('Тип с таким url уже существует.');
    }
    await this.db.types.create({ data: { ...createTypeDto } });
    return 'Тип создан.';
  }

  async findAll(page: number = 1, limit: number = 16) {
    const offset = (page - 1) * limit;
    const totalCount = await this.db.types.count();
    const types = await this.db.types.findMany({
      take: limit,
      skip: offset,
      include: {
        image: true,
      },
    });
    return { totalCount, types };
  }

  async findOne(id: number) {
    const type = await this.db.types.findFirst({ where: { id } });
    return type;
  }

  async findOneByUrl(url: string) {
    const type = await this.db.types.findFirst({ where: { url } });
    return type;
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    const type = await this.findOne(id);
    if (!type) {
      throw new NotFoundException('id указан неверно.');
    }

    const image = await this.imagesService.findOne(updateTypeDto.image_id);
    if (!image) {
      throw new NotFoundException('Такого изображения не существует.');
    }

    const urlType = await this.findOneByUrl(updateTypeDto.url);
    if (urlType && urlType.id !== id) {
      throw new NotFoundException('Тип с таким url уже существует.');
    }

    await this.db.types.update({ where: { id }, data: { ...UpdateTypeDto } });
    return 'Тип обновлён.';
  }

  async remove(id: number) {
    const type = await this.findOne(id);
    if (!type) {
      throw new NotFoundException('id указан неверно.');
    }
    await this.db.types.delete({ where: { id } });
    return 'Пользователь удалён.';
  }
}
