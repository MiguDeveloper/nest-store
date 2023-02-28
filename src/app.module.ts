import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const API_KEY = '12345678';
const API_KEY_PROD = 'EHDN12345';

@Module({
  imports: [UsersModule, ProductsModule, HttpModule],
  controllers: [AppController, OrdersController],
  providers: [
    AppService,
    OrdersService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'TASKS',
      inject: [HttpService],
      useFactory: async (http: HttpService) => {
        const tasks$ = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
        );
        const data = await (await firstValueFrom(tasks$)).data;
        return data;
      },
    },
  ],
})
export class AppModule {}
