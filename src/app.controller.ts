import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  // Usamos la desestructuracion
  @Get('example/:param1/params/:param2')
  getExample(@Param() { param1, param2 }) {
    return `Parametro1: ${param1}, Parametro2: ${param2}`;
  }
}
