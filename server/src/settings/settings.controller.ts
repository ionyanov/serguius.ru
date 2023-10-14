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
	setSettings(@Body() settingDto: SettingsDto) {
		return this.settingsService.setSettings(settingDto);
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Delete(':name')
	delSettings(@Param('name') name: string) {
		return this.settingsService.delSettings(name);
	}
}
