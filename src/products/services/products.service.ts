import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductsDto, UpdateProductDto } from '../dto/products.dtos';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'la descripcion',
      price: 6363,
      stock: 233,
      image: '',
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'la descripcion 2',
      price: 783,
      stock: 948,
      image: 'path/url/img',
    },
  ];

  get getSizeProducts() {
    return this.products.length;
  }

  findAll() {
    return this.products;
  }

  findById(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  create(payload: CreateProductsDto) {
    const id = this.getSizeProducts + 1;
    const newProduct = { id, ...payload };
    this.products = [...this.products, newProduct];
    return newProduct;
  }

  update(payload: UpdateProductDto, id: number) {
    const idx = this.products.findIndex((product) => product.id === id);
    const hasIdx = 0 <= idx;
    if (!hasIdx) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    const productUpdate = { ...this.products[idx], ...payload };
    this.products[idx] = productUpdate;
    return productUpdate;
  }

  remove(id: number) {
    const idx = this.products.findIndex((product) => product.id === id);
    const hasIdx = 0 <= idx;
    if (!hasIdx) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(idx, 1);
    return this.products;
  }
}
