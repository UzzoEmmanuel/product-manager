import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 13' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Le dernier iPhone avec une superbe caméra' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @ApiPropertyOptional({ example: 'https://example.com/iphone.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
