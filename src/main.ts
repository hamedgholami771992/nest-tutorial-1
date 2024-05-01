import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
      transform: true,  //it converts req.body to required types
      whitelist: true,  //it removes all fields not exists inside dto
      forbidNonWhitelisted: true,  //it throws an error in case of extra fields
      transformOptions: {
        enableImplicitConversion: true,   //so there is no need to use @Type() in dtos 

      }
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalGuards(new ApiKeyGuard())
  await app.listen(3000);
}
bootstrap();
