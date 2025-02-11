import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { FileService } from '../common/file/file.service';
import { FileUploadInterceptor } from 'src/common/interceptors/file-upload.interceptor';

@ApiTags('products')
@Controller('products')
@UseGuards(ThrottlerGuard)
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @UseInterceptors(FileUploadInterceptor())
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() file?: Express.Multer.File) {
    if (file) {
      createProductDto.imageUrl = this.fileService.getFileUrl(file.filename);
    }
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with pagination' })
  findAll(@Query() query: FindAllProductsDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @UseInterceptors(FileUploadInterceptor())
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateProductDto.imageUrl = this.fileService.getFileUrl(file.filename);
    }
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  // Upload séparé si besoin: Utile pour les interfaces où on veut prévisualiser l'image avant de créer le produit
  @Post('upload')
  @UseInterceptors(FileUploadInterceptor())
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("Aucun fichier n'a été uploadé");
    }

    return {
      imageUrl: this.fileService.getFileUrl(file.filename),
    };
  }
}
