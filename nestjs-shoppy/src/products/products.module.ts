import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImagesService } from 'src/images/images.service';

@Module({
  imports: [PrismaModule],
  providers: [ProductsService, ImagesService],
  controllers: [ProductsController],
})
export class ProductsModule {}
