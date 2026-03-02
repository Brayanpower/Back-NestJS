import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));  
  const config = new DocumentBuilder().setTitle('API Con vunerabilidades de seguridad').setDescription('Documento de API').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//? MySQL
//!npm i mysql2
//?npm i @types/mysql -D

//? Postgrest
//? npm i pg
//? npm i @types/pg -D

//?Swagger
// npm install --save @nestjs/swagger

