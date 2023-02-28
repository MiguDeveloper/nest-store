import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() payload: any) {
    /*if (!payload) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Debe de envia el payload',
      });
    }*/

    return { message: 'accion de crear', payload };
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOrdersByUserId(id);
  }
}
