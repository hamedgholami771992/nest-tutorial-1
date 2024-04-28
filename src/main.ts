import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
      transform: true,  //it converts req.body to required types
      whitelist: true,  //it removes all fields not exists inside dto
      forbidNonWhitelisted: true  //it throws an error in case of extra fields
  }))
  await app.listen(3000);
}
bootstrap();
