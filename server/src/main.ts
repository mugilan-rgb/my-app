import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Allow all origins temporarily
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT || 8080);
  console.log(`✅ Server running on port ${process.env.PORT || 8080}`);
}
bootstrap();
