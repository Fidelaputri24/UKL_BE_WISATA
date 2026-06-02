import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(
    join(__dirname, '..', 'uploads'),
    {
      prefix: '/uploads/',
    },
  );

   const config = new DocumentBuilder()     .setTitle('Library API')     .setDescription('Backend API Sistem Perpustakaan')     .setVersion('1.0')     .addBearerAuth()     .build();    const document = SwaggerModule.createDocument(app, config);   SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT || 3000);
}
bootstrap();