import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import * as hbs from 'express-handlebars'
import { join } from 'path'
import { CustomHelper } from './helpers/hbs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))

  app.use(cookieParser());

  app.engine('hbs', hbs({
    defaultLayout: `main`,
    extname: `hbs`,
    helpers: CustomHelper
  }))

  app.setViewEngine('hbs')

  await app.listen(3000);

  console.log(`dir public ${join(__dirname, '..', 'views')}`, )
}
bootstrap();
