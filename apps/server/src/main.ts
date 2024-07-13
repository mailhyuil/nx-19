import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  /** Logger */
  app.use(morgan('combined'));
  /** Cookie Parser */
  app.use(cookieParser());
  /** Compression */
  app.use(compression());
  /** Security */
  app.use(helmet());
  /** CORS */
  app.enableCors();
  /** Global Prefix */
  app.setGlobalPrefix('api/v1');
  /** Port */
  const port = process.env.SERVER_PORT || 3000;
  /** Server Listen */
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
