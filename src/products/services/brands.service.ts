import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dtos';

@Injectable()
export class BrandsService {
  brands: Brand[] = [
    { id: 1, name: 'Apple', image: 'https://i.imgur.com/U4iGx1j.jpeg' },
    { id: 2, name: 'Microsoft', image: 'https://i.imgur.com/U4iGx1j.jpeg' },
    { id: 3, name: 'Google', image: 'https://i.imgur.com/U4iGx1j.jpeg' },
  ];

  get sizeBrands() {
    return this.brands.length;
  }

  findAll() {
    return this.brands;
  }

  findById(id: number) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const id = this.sizeBrands + 1;
    const newBrand = { id, ...payload };
    this.brands = [...this.brands, newBrand];
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const idx = this.brands.findIndex((brand) => brand.id === id);
    const hasIdx = idx === -1;
    if (hasIdx) {
      throw new NotFoundException(`Brand #${id} not fount`);
    }
    const brandUpdate = { ...this.brands[idx], ...payload };
    this.brands[idx] = brandUpdate;
    return brandUpdate;
  }

  remove(id: number) {
    const idx = this.brands.findIndex((brand) => brand.id === id);
    const hasIdx = idx === -1;
    if (hasIdx) {
      throw new NotFoundException(`Brand #${id} not fount`);
    }

    this.brands.splice(idx, 1);
    return true;
  }
}
