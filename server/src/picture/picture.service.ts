import { Injectable } from '@nestjs/common';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { IPictureDto } from './picture.dto';

@Injectable()
export class PictureService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LogService,
	) { }

	async addPicture(category: string, file: Express.Multer.File) {
		let result;
		try {
			const cat = await this.prisma.category.findFirst({
				where: {
					link: category
				}
			})
			if (cat)
				result = await this.prisma.picture.create({
					data: {
						link: file.filename,
						name: file.originalname,
						date: '',
						categoryId: cat.id,
					}
				});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error upload file');
		}
		return result;
	}

	async getPictures(category: string) {
		const result = await this.prisma.picture.findMany({
			where: {
				category: {
					link: category
				}
			}
		});
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
		var fs = require('fs');
		var path = require('path');
		let result;
		try {
			result = await this.prisma.picture.findFirst({
				where: {
					id: picId
				}
			});
			if (result) {
				const file = path.resolve(__dirname, process.env.UPLOAD_DIR, result.link)
				if (fs.existsSync(file)) fs.unlinkSync(file);
				result = await this.prisma.picture.deleteMany({
					where: {
						id: picId
					}
				});
			}
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error upload file');
		}
		return result;
	}
}
