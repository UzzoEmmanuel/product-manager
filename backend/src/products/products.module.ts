import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CacheModule } from '../common/cache/cache.module';
import { FileModule } from '../common/file/file.module';
import { LoggerService } from '../common/logger/logger.service';

@Module({
  imports: [PrismaModule, CacheModule, FileModule],
  controllers: [ProductsController],
  providers: [ProductsService, LoggerService],
  exports: [ProductsService],
})
export class ProductsModule {}
