import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LogService } from './log.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { CategoryModule } from './category/category.module';
import { ImagesModule } from './picture/picture.module';
import { OrderModule } from './order/order.module';
import { NextapiModule } from './nextapi/nextapi.module';
import { DeployService } from './deploy.service';

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
		NextapiModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService, LogService, DeployService],
})
export class AppModule { }
