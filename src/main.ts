import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	//TODO learn how to configure cors
	app.enableCors();
	await app.listen(8080);
}

bootstrap();
