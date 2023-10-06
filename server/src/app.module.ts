import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SettingsModule } from './settings/settings.module';
import { LogService } from './log.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ImagesModule } from './images/images.module';
import { OrderModule } from './order/order.module';

const ENV = process.env.NODE_ENV;

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: !ENV ? '.env' : `.env.${ENV}` }),
		AuthModule,
		SettingsModule,
		CategoryModule,
		UserModule,
		ImagesModule,
		OrderModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService, LogService],
})
export class AppModule {}
