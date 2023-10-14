import {
	Body,
	Controller,
	Delete,
	Get, HttpCode,
	Param, Post,
	Put,
	UploadedFile, UseInterceptors
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IPictureDto } from './picture.dto';
import { Auth } from 'src/_security';

@Controller('picture')
export class PictureController {
	constructor(private readonly pictureService: PictureService) { }

	@Auth()
	@Get(':category')
	@HttpCode(200)
	public async getPictures(@Param('category') category: string) {
		return this.pictureService.getPictures(category);
	}

	@Auth()
	@Post('upload/:category')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	public async onUpload(
		@Param('category') category: string,
		@UploadedFile() file: Express.Multer.File,
		@Body() body: IPictureDto,
	) {
		this.pictureService.addPicture(category, file, body);
	}

	@Auth()
	@Post()
	@HttpCode(200)
	public async setPicture(@Body() data: IPictureDto) {
		return this.pictureService.setPicture(data);
	}

	@Auth()
	@Delete(':picId')
	@HttpCode(200)
	public async delPicture(@Param('picId') picId: string) {
		return this.pictureService.delPicture(+picId);
	}
}
