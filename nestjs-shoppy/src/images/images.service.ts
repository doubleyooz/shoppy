import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Image } from '@prisma/client';

@Injectable()
export class ImagesService {
  constructor(private readonly prismaService: PrismaService) {}
  async createImage(
    _file: Express.Multer.File,
    productId: number,
    productName: string,
  ) {
    return await this.prismaService.image.create({
      data: { name: productName + '-' + _file.filename, productId },
    });
  }

  async createManyImages(
    _files: Array<Express.Multer.File>,
    productId: number,
    productName: string,
  ) {
    const mappedFiles = _files.map((file) => ({
      name: productName + '-' + file.filename,
      productId,
    })) as Omit<Image, 'id'>[];

    return await this.prismaService.image.createMany({
      data: mappedFiles,
    });
  }

  async getImages(productId: number) {
    return this.prismaService.image.findMany({
      where: {
        productId: productId,
      },
    });
  }
}
