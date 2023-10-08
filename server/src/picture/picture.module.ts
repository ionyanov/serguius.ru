import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
var path = require('path');

@Module({
	controllers: [PictureController],
	providers: [PictureService, PrismaService, LogService],
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
						.map(() => Math.round(Math.random() * 20).toString(20))
						.join('');
					callback(null, `${randomName}${fileExtName}`);
				},
			}),
		}),
	],
})
export class ImagesModule { }
