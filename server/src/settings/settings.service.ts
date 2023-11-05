import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SettingsDto } from './settings.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { LogService } from 'src/log.service';

@Injectable()
export class SettingsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LogService,
	) { }

	async getAll() {
		let result = {};
		try {
			const settings = await this.prisma.setting.findMany({
				orderBy: {
					name: 'asc',
				},
			});
			settings.map(item => (result[item.name] = item.value));
		} catch (e) {
			await this.logger.LogMessage(e, 'Error getting settings');
		}
		return result;
	}

	async getSettings(name: string) {
		let result = '';
		try {
			const settings = await this.prisma.setting.findFirst({
				where: {
					name: name,
				},
				orderBy: {
					name: 'asc',
				},
			});
			if (settings)
				result = settings.value;
		} catch (e) {
			await this.logger.LogMessage(e, 'Error getting settings');
		}
		return result;
	}

	async setSettings(settingDto: SettingsDto) {
		let settings = {};
		try {
			settings = await this.prisma.setting.upsert({
				create: {
					name: settingDto.name ?? 'NAME',
					value: settingDto.value ?? 'VALUE',
				},
				update: {
					...settingDto,
				},
				where: {
					name: settingDto.name,
				},
			});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error getting settings');
		}
		return settings;
	}

	async delSettings(name: string) {
		let settings = {};
		try {
			settings = await this.prisma.setting.deleteMany({
				where: {
					name: name,
				},
			});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error deleting settings');
		}
		return settings;
	}
}
