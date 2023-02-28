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
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dtos';

@Controller('brands')
export class BrandsController {
  constructor(private brandServices: BrandsService) {}

  @Get('')
  getBrands() {
    return this.brandServices.findAll();
  }

  @Get(':brandId')
  getBrandByID(@Param('brandId', ParseIntPipe) id: number) {
    const brand = this.brandServices.findById(id);
    return { brand };
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    const newBrand = this.brandServices.create(payload);
    return { newBrand };
  }

  @Put(':brandId')
  update(
    @Body() payload: UpdateBrandDto,
    @Param('brandId', ParseIntPipe) id: number,
  ) {
    const brand = this.brandServices.update(id, payload);
    return brand;
  }

  @Delete(':brandId')
  delete(@Param('brandId', ParseIntPipe) id: number) {
    return this.brandServices.remove(id);
  }
}
