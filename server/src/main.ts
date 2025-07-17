import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
   const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });  // Disable all logs

  app.enableCors({
    origin: '*',
  });
  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();