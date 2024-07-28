import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ImagesController } from './images.controller';

@Module({
  imports: [PrismaModule],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
