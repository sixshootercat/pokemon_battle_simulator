import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Pokemon Battle Simulator API')
    .setDescription('A RESTful API for Pokemon Battle Simulator')
    .setVersion('1.0')
    .addTag('pokemon')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('/v1/api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
