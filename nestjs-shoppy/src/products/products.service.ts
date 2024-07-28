import { Injectable } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imageService: ImagesService,
  ) {}
  async createProduct(
    data: CreateProductRequest,
    userId: number,
    _files: Array<Express.Multer.File>,
  ) {
    const productResult = await this.prismaService.product.create({
      data: { ...data, userId },
    });
    if (_files?.length > 0)
      await this.imageService.createManyImages(
        _files,
        productResult.id,
        productResult.name,
      );
    return productResult;
  }

  async getProducts() {
    return await this.prismaService.product.findMany();
  }
}
