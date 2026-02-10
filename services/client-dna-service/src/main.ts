import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // CORS - Allow all Vercel domains
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      /\.vercel\.app$/,
      /\.railway\.app$/,
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // API Prefix
  app.setGlobalPrefix('api');

  // Port for Railway
  const port = process.env.PORT || 3002;
  
  // IMPORTANT: Listen on 0.0.0.0 for Railway
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 CreativeOS Backend running on port ${port}`);
  console.log(`📡 API available at: http://0.0.0.0:${port}/api`);
}

bootstrap();