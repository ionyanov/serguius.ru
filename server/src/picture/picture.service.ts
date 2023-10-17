import { Injectable } from '@nestjs/common';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { FileService } from 'src/file.service';
import { IPictureDto } from './picture.dto';

@Injectable()
export class PictureService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LogService,
		private readonly fileService: FileService,
	) { }

	async addPicture(
		category: string,
		file: Express.Multer.File,
		picture: IPictureDto,
	) {
		let result;
		try {
			const cat = await this.prisma.category.findFirst({
				where: {
					link: category,
				},
			});
			if (cat)
				result = await this.prisma.picture.create({
					data: {
						link: file.filename,
						name: picture.name,
						date: picture.date,
						material: picture.material,
						size: picture.size,
						categoryId: cat.id,
					},
				});
			let res = await this.fileService.createPreview(file.filename);
			res = await this.fileService.createPublic(file.filename);
		} catch (e) {
			await this.logger.LogMessage(e, 'Error upload file');
		}
		return result;
	}

	async getPictures(category?: string) {
		const cond = category
			? {
				category: {
					link: category,
				},
			}
			: undefined;

		const result = await this.prisma.picture.findMany({
			select: {
				...this.getReturnField(),
			},
			where: {
				...cond,
			},
		});
		return result;
	}

	async getPicturesById(id: number) {
		const result = await this.prisma.picture.findFirst({
			select: {
				...this.getReturnField(),
			},
			where: {
				id: id,
			},
		});
		return result;
	}

	private randomString(values: string[]): string {
		const index = Math.floor(Math.random() * values.length);
		return values[index];
	}
	private randomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	async getRandom(count: number) {
		let result = [];
		let cnt = await this.prisma.picture.count();
		let setcnt = Math.floor(cnt / count);
		const orderBy = this.randomString([
			'id',
			'categoryId',
			'date',
			`link`,
			`material`,
			`size`,
			`created`,
			`updated`,
			`name`,
		]);
		const orderDir = this.randomString([`asc`, `desc`]);
		try {
			for (let i = 0; i < count; i++) {
				const item = await this.prisma.picture.findFirst({
					take: 1,
					skip: this.randomNumber(i * setcnt, (i + 1) * setcnt - 1),
					select: {
						...this.getReturnField(),
					},
					where: {
						category: {
							visible: true,
						},
					},
					orderBy: { [orderBy]: orderDir },
				});
				result.push(item);
			}
		} catch (e) {
			await this.logger.LogMessage(e, 'Error random picture');
		}
		return result;
	}

	async setPicture(picture: IPictureDto) {
		let result = {};
		try {
			result = await this.prisma.picture.update({
				data: {
					name: picture.name,
					material: picture.material,
					date: picture.date,
					size: picture.size,
				},
				where: {
					id: picture.id,
				},
			});
		} catch (e) {
			await this.logger.LogMessage(e, 'Error update picture');
		}
		return result;
	}

	async delPicture(picId: number) {
		let result;
		try {
			result = await this.prisma.picture.findFirst({
				where: {
					id: picId,
				},
			});
			if (result) {
				this.fileService.delFile(result.link)
				result = await this.prisma.picture.deleteMany({
					where: {
						id: picId,
					},
				});
			}
		} catch (e) {
			await this.logger.LogMessage(e, 'Error upload file');
		}
		return result;
	}

	getReturnField() {
		return {
			id: true,
			name: true,
			link: true,
			material: true,
			date: true,
			size: true,
			categoryId: true,
			category: {
				select: {
					name: true,
					link: true,
				},
			},
		};
	}
}
