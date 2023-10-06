import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IImagesDto } from './images.dto';
import { Auth } from 'src/_security';

@Controller('images/:propId')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Post('upload')
	@Auth()
	@HttpCode(200)
	@UseInterceptors(FilesInterceptor('files'))
	public async onUpload(
		@Param('propId') propId: string,
		@UploadedFiles() files: Array<Express.Multer.File>,
	) {
		this.imagesService.addImages(+propId, files);
	}

	@HttpCode(200)
	@Get()
	public async getImages(@Param('propId') propId: string) {
		return this.imagesService.getImages(+propId);
	}

	@Auth()
	@HttpCode(200)
	@Post()
	public async setImages(
		@Param('propId') propId: string,
		@Body() data: IImagesDto,
	) {
		return this.imagesService.setImages(+propId, data);
	}

	@Auth()
	@HttpCode(200)
	@Delete(':imgId')
	public async delImages(
		@Param('propId') propId: string,
		@Param('imgId') imgId: string,
	) {
		return this.imagesService.delImages(+propId, +imgId);
	}
}
