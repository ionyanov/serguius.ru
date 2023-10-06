import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LogService } from '../log.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LogService,
	) { }

	async getMenu() {
		let result = {};
		try {
			result = await this.prisma.category.findMany({
				select: {
					id: true,
					name: true,
					link: true,
				},
				where: {
					visible: true,
				},
				orderBy: {
					name: 'asc',
				},
			});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error getting menu');
		}
		return result;
	}

	async getAll() {
		let result = {};
		try {
			result = await this.prisma.category.findMany({
				orderBy: {
					name: 'asc',
				},
			});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error getting menu');
		}
		return result;
	}

	async upsert(categoryDto: CategoryDto) {
		let settings = {};
		try {
			settings = await this.prisma.category.upsert({
				create: {
					name: categoryDto.name,
					link: categoryDto.link,
					visible: categoryDto.visible,
				},
				update: {
					name: categoryDto.name,
					link: categoryDto.link,
					visible: categoryDto.visible,
				},
				where: {
					id: categoryDto.id,
				},
			});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error getting settings');
		}
		return settings;
	}

	async remove(id: number) {
		let result = {};
		try {
			result = await this.prisma.category.deleteMany({
				where: {
					id: id,
				},
			});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error deleting settings');
		}
		return result;
	}
}
