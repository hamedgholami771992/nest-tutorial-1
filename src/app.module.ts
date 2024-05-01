import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi';
import appConfig from './config/app.config'
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';

@Module({

  imports: [
    ConfigModule.forRoot({
      // ignoreEnvFile: true,   when deploying app to production, you may not need loading .env files
      // envFilePath: [".env"]   //to overwwrite default path, if a var is found in multiple env files, the first takes precedence over the rest
      // validationSchema: Joi.object({
      //   DATABASE_HOST: Joi.required(),   //by default any env var is optional
      //   DATABASE_PORT: Joi.number().default(5432)   //it parses to number with default value
      // })
      load: [appConfig]
    }),  //parses and loads .env file from the default location, root dir

    CoffeesModule,
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: process.env.DATABASE_HOST,
    //   port: +process.env.DATABASE_PORT,
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   //ensures that typeOrm entities will be synced with the database every time we run our app instead of passing entities arr
    //   //make sure to disable this in production
    //   //typeorm automatically generate a sql table from all classes with @Entity()

    // })
    TypeOrmModule.forRootAsync({  //we load it asyncly to not be affected by the order of loading before loading the configModule
      useFactory: () => ({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CommonModule


  ],
  controllers: [AppController],
  providers: [
    AppService, {
      provide: APP_PIPE,   //as global pipe
      useClass: ValidationPipe
    }
  ],
})
export class AppModule { }
