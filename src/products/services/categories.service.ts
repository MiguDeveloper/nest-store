import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dtos';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'categoria 1',
      description: '',
    },
    {
      id: 2,
      name: 'categoria 2',
      description: '',
    },
  ];

  get sizeCategories() {
    return this.categories.length;
  }

  findAll() {
    return this.categories;
  }

  findById(id: number) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const id = this.sizeCategories + 1;
    const newCategory = { id, ...payload };
    this.categories = [...this.categories, newCategory];
    return newCategory;
  }

  update(payload: UpdateCategoryDto, id: number) {
    const idx = this.categories.findIndex((category) => category.id === id);
    const hasIdx = idx >= 0;
    if (!hasIdx) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    const categoryUpdate = { ...this.categories[idx], ...payload };
    this.categories[idx] = categoryUpdate;
    return categoryUpdate;
  }

  remove(id: number) {
    const idx = this.categories.findIndex((category) => category.id === id);
    const hasIdx = idx >= 0;
    if (!hasIdx) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(idx, 1);
    return true;
  }
}
