import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function startServer() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(8080);
  } catch (e) {
    throw new Error(`Error while listening to the port 8000 ${e}`);
  }
}
startServer();
