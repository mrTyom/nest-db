import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // Делаем конфигурацию доступной для всего приложения
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
