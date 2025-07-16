import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as dotenv from 'dotenv'; // Import dotenv to load environment variables locally

// Load environment variables from .env file when running locally
dotenv.config();

let cachedApp: INestApplication; // Cache the app instance for better cold start performance

async function bootstrap() {
  if (cachedApp) {
    return cachedApp; // Return cached instance if available
  }
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS before app.init()
  // Adjust 'origin' for your production frontend URL on Vercel
  // You might want to get this from process.env.FRONTEND_URL for production
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Use an environment variable for production
    credentials: true, // if you are using cookies or headers
  });

  // Call app.init() to initialize the application, but do NOT call app.listen()
  await app.init();
  cachedApp = app; // Cache the initialized app
  return app;
}

// This is the Vercel serverless function handler
// It's the default export that Vercel looks for.
export default async function (req, res) {
  const app = await bootstrap(); // Get the initialized NestJS app
  
  // Get the underlying HTTP server instance (e.g., Express app)
  const server = app.getHttpAdapter().getInstance();

  // Let the underlying server handle the request
  // This is how Vercel integrates with NestJS (or Express/Fastify)
  server(req, res);
}

// Optional: This part allows you to run your NestJS app locally using 'npm run start'
// without needing a separate script for local development.
// It will only execute when the file is run directly (e.g., 'node dist/main.js' or 'nest start').
// This block will NOT execute when deployed as a serverless function on Vercel.
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  bootstrap().then(app => {
    // Only call app.listen() when running locally
    const port = process.env.PORT || 8080;
    app.listen(port).then(() => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  });
}