import { Injectable } from '@nestjs/common';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { IImagesDto } from './images.dto';

@Injectable()
export class ImagesService {
	setImages(arg0: number, data: IImagesDto) {
		throw new Error('Method not implemented.');
	}
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LogService,
	) {}

	async addImages(prodId: number, files: Array<Express.Multer.File>) {
		let result;
		/*let mainImageId;
		try {
			result = await this.prisma.product.findFirst({
				select: {
					mainImageId: true
				},
				where: {
					id: prodId
				}
			});
			mainImageId = result.mainImageId;
			files.map(async file => {
				result = await this.prisma.productImage.create({
					data: {
						link: file.filename,
						productId: prodId,
						description: '',
					}
				});
				if (!mainImageId) {
					mainImageId = result.id;
					this.setMain(prodId, mainImageId);
				}
			})
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error upload file');
		}*/
		return result;
	}

	async getImages(prodId: number) {
		const result = ''; /*= await this.prisma.productImage.findMany({
			select: {
				id: true,
				description: true,
				link: true,
			},
			where: {
				productId: prodId
			}
		});*/
		return result;
	}

	async delImages(prodId: number, imgId: number) {
		var fs = require('fs');
		var path = require('path');
		let result;
		/*try {
			result = await this.prisma.productImage.findFirst({
				where: {
					id: imgId,
					productId: prodId
				}
			});
			if (result) {
				const file = path.resolve(__dirname, process.env.UPLOAD_DIR, result.link)
				if (fs.existsSync(file))
					fs.unlinkSync(file);
				result = await this.prisma.productImage.deleteMany({
					where: {
						id: imgId,
						productId: prodId
					}
				});
				result = await this.prisma.product.updateMany({
					data: {
						mainImageId: null,
					},
					where: {
						id: prodId,
						mainImageId: imgId,
					}
				});
			}
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error upload file');
		}*/
		return result;
	}
}
