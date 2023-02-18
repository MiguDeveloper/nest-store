import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() payload: any) {
    /*if (!payload) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Debe de envia el payload',
      });
    }*/

    return { message: 'accion de crear', payload };
  }
}
