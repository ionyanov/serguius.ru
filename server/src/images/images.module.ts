import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
var path = require('path');

@Module({
	controllers: [ImagesController],
	providers: [ImagesService, PrismaService, LogService],
	imports: [
		MulterModule.register({
			dest: path.resolve(__dirname, process.env.UPLOAD_DIR),
			storage: diskStorage({
				destination: path.resolve(__dirname, process.env.UPLOAD_DIR),
				filename: (req, file, callback) => {
					const fileExtName = extname(
						file.originalname,
					).toLowerCase();
					const randomName = Array(20)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('');
					callback(null, `${randomName}${fileExtName}`);
				},
			}),
		}),
	],
})
export class ImagesModule {}
