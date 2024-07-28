import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Image } from '@prisma/client';

@Injectable()
export class ImagesService {
  constructor(private readonly prismaService: PrismaService) {}
  async createImage(_file: Express.Multer.File, productId: number) {
    await this.hasReachedMaxImages(productId);
    return await this.prismaService.image.create({
      data: { name: productId + '-' + _file.filename, productId },
    });
  }

  async createManyImages(
    _files: Array<Express.Multer.File>,
    productId: number,
  ) {
    await this.hasReachedMaxImages(productId, _files.length);
    const mappedFiles = _files.map((file) => ({
      name: productId + '-' + file.filename,
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

  private async hasReachedMaxImages(productId: number, newImagesCount = 1) {
    const imagesCount = await this.prismaService.image.count({
      where: { productId: productId },
    });

    if (imagesCount + newImagesCount > 5)
      new BadRequestException('cannot upload more than 5 images');
  }
}
