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

	async getCategories() {
		let result = {};
		try {
			result = await this.prisma.category.findMany({
				orderBy: {
					order: 'asc',
				},
			});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error getting menu');
		}
		return result;
	}

	async setCategory(categoryDto: CategoryDto) {
		let result = {};
		try {
			const cnt = await this.prisma.category.count()

			result = await this.prisma.category.upsert({
				create: {
					name: categoryDto.name,
					link: categoryDto.link,
					visible: categoryDto.visible,
					order: cnt,
					parCategoryId: categoryDto.parCategoryId
				},
				update: {
					name: categoryDto.name,
					link: categoryDto.link,
					visible: categoryDto.visible,
					parCategoryId: categoryDto.parCategoryId
				},
				where: {
					id: categoryDto.id,
				},
			});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error getting settings');
		}
		return result;
	}

	async delCategory(id: number) {
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

	async moveCategory(id: number, duration: 'up' | 'down') {
		let result;
		try {
			const cat = await this.prisma.category.findFirst({
				select: {
					parCategoryId: true,
					order: true
				},
				where: {
					id: id
				}
			});
			//this.prisma.LogOn()
			result = await this.prisma.category.updateMany({
				data: {
					order: cat.order
				},
				where: {
					order: duration == 'up' ? cat.order - 1 : cat.order + 1,
					parCategoryId: cat.parCategoryId
				},
			});
			if (result.count > 0)
				result = await this.prisma.category.updateMany({
					data: {
						order: duration == 'up' ? cat.order - 1 : cat.order + 1
					},
					where: {
						id: id
					},
				});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error move category');
		}
		return result;
	}
}
