import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
    {
      id: 2,
      email: 'correo2@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];
  constructor(private productsService: ProductsService) {}

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  getOrdersByUserId(id: number): Order {
    const user = this.findOne(id);
    const products = this.productsService.findAll();
    return {
      date: new Date(),
      user,
      products,
    };
  }
}
