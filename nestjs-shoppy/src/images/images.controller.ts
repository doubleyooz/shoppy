import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Post(':productId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 6, {
      storage: diskStorage({
        destination: 'public/products',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const ext = file.originalname.split('.')[1];
          cb(null, `${req.params.productId}-${name}-${Date.now()}.${ext}`);
        },
      }),
    }),
  )
  uploadProductImage(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    _files: Array<Express.Multer.File>,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.imageService.createManyImages(_files, productId);
  }
}
