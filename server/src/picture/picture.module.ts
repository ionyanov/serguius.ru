import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { PictureService } from './picture.service';
import { FileService } from 'src/file.service';

@Module({
	controllers: [PictureController],
	providers: [PictureService, PrismaService, LogService, FileService],
	imports: [
		MulterModule.register({
			dest: resolve(process.env.UPLOAD_DIR),
			storage: diskStorage({
				destination: resolve(process.env.UPLOAD_DIR),
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
