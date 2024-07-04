import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/db/prisma.service';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  controllers: [SearchController],
  providers: [SearchService, PrismaService],
})
export class SearchModule {}
