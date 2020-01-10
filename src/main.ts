import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  var fs = require('fs');
  var dir = './photos';

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  app.use('/photos', express.static('photos'));
  await app.listen(3000);
}
bootstrap();
