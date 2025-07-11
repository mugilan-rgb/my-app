import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS before app.listen
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // if you are using cookies or headers
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
