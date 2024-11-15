import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppDataSource } from './data-source';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Настройка Swagger
    const config = new DocumentBuilder()
      .setTitle('User Microservice API')
      .setDescription('API для управления пользователями')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // DataSource init
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.error('Error during Data Source initialization', error);
  }
}

bootstrap();
