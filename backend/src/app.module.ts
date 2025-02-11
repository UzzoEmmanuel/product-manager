import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerService } from './common/logger/logger.service';
import { ThrottlerConfigModule } from './common/throttler/throttler.module';
import { CacheModule } from './common/cache/cache.module';

@Module({
  imports: [ProductsModule, PrismaModule, ThrottlerConfigModule, CacheModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
