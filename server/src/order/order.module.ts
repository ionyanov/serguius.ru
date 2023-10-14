import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMailConfig } from 'src/getMailConfig';
import { SettingsService } from 'src/settings/settings.service';

@Module({
	controllers: [OrderController],
	providers: [
		OrderService,
		PrismaService,
		LogService,
		UserService,
		SettingsService,
	],
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMailConfig,
		}),
	],
})
export class OrderModule { }
