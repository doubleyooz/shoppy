import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductRequest } from './dto/create-product.request';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { ProductsService } from './products.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 6, {
      storage: diskStorage({
        destination: 'public/products',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const ext = file.originalname.split('.')[1];
          cb(null, `${req.body.name}-${name}-${Date.now()}.${ext}`);
        },
      }),
    }),
  )
  createProduct(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
        fileIsRequired: false,
      }),
    )
    _files: Array<Express.Multer.File>,
    @Body() body: CreateProductRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.productsService.createProduct(body, user.userId, _files);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getProducts() {
    return this.productsService.getProducts();
  }
}
