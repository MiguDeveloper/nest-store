import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dtos';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Get()
  getCategories() {
    const categories = this.categoriesServices.findAll();
    return { categories };
  }

  @Get(':categoryId')
  getCategoryById(@Param('categoryId', ParseIntPipe) categoryId: number) {
    const category = this.categoriesServices.findById(categoryId);
    return { category };
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    const newCategory = this.categoriesServices.create(payload);
    return { category: newCategory };
  }

  @Put(':categoryId')
  update(
    @Body() payload: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    const category = this.categoriesServices.update(payload, categoryId);
    return { category };
  }

  @Delete(':categoryId')
  delete(@Param('categoryId', ParseIntPipe) categoryId: number) {
    const status = this.categoriesServices.remove(categoryId);
    return { status };
  }

  @Get(':categoryId/products/:productId')
  getCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return `Producto ${productId} de la categoria ${categoryId}`;
  }
}
