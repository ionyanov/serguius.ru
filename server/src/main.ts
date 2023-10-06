import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.enableCors({
		origin: '*',
		credentials: true, //access-control-allow-credentials:true
		optionsSuccessStatus: 200,
	});
	await app.listen(process.env.PORT);
}

bootstrap();
