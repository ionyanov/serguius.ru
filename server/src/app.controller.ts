import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from './_security';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getHello() {
		return this.appService.getHello();
	}

	@Auth()
	@Post('deploy')
	deploy() {
		return this.appService.deploy();
	}

	@Auth()
	@Get('/logs?:recCnt')
	getLogs(@Param('recCnt') recCnt: number) {
		return this.appService.getLogs(+recCnt);
	}
}
