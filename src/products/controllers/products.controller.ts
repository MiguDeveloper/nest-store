import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductsDto, UpdateProductDto } from '../dto/products.dtos';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(@Query() params: any) {
    const { limit = 199, offset = 0, brand = '' } = params;
    const products = this.productService.findAll();
    return { products };
  }

  @Get('filter')
  getFilter() {
    return `Yo soy un filter`;
  }

  @Get(':productId')
  getProductById(@Param('productId', ParseIntPipe) productId: number) {
    const product = this.productService.findById(productId);

    return { product };
  }

  @Post()
  create(@Body() payload: CreateProductsDto) {
    const product = this.productService.create(payload);
    return { product };
  }

  @Put(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    const product = this.productService.update(payload, id);
    return { product };
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    const products = this.productService.remove(id);
    return { products };
  }
}
