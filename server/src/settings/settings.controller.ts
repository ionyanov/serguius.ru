import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { SettingsDto } from './settings.dto';
import { SettingsService } from './settings.service';
import { Auth } from 'src/_security';

@Controller('settings')
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

	@HttpCode(200)
	@Get()
	getAll() {
		return this.settingsService.getAll();
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	create(@Body() settingDto: SettingsDto) {
		return this.settingsService.upsert(settingDto);
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Delete(':name')
	remove(@Param('name') name: string) {
		return this.settingsService.remove(name);
	}
}
