import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import { LoggerService } from 'src/common/logger/logger.service';
import { CacheService } from '../common/cache/cache.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
    private cacheService: CacheService,
  ) {}

  private async deleteImageFile(imageUrl: string | null) {
    if (imageUrl?.includes('/uploads/')) {
      const imageName = imageUrl.split('/uploads/')[1];
      const imagePath = path.join(process.cwd(), 'uploads', imageName);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    this.logger.productCreated(product.id, product.name);
    await this.cacheService.clear();
    return product;
  }

  async findAll(query: FindAllProductsDto) {
    const { page = 1, limit = 10 } = query;

    const cacheKey = `products_page${page}_limit${limit}`;

    const cachedData = await this.cacheService.get(cacheKey);
    if (cachedData) {
      this.logger.log('Données récupérées depuis le cache', 'ProductsService');
      return cachedData;
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count(),
    ]);

    const result = {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    await this.cacheService.set(cacheKey, result);
    this.logger.log('Données mises en cache', 'ProductsService');

    return result;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const oldProduct = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!oldProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      if (updateProductDto.imageUrl && oldProduct.imageUrl !== updateProductDto.imageUrl) {
        await this.deleteImageFile(oldProduct.imageUrl);
      }

      const product = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });

      this.logger.productUpdated(product.id, product.name);
      await this.cacheService.clear();
      return product;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      await this.deleteImageFile(product.imageUrl);

      await this.prisma.product.delete({
        where: { id },
      });

      this.logger.productDeleted(id);
      await this.cacheService.clear();
      return product;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
