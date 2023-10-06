import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { PrismaService } from 'src/prisma.service';
import { LogService } from 'src/log.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	controllers: [SettingsController],
	providers: [SettingsService, PrismaService, LogService],
	imports: [ConfigModule],
})
export class SettingsModule {}
