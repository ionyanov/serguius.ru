import { Injectable } from '@nestjs/common';
import { DeployService } from './deploy.service';
import { LogService } from './log.service';

@Injectable()
export class AppService {
	constructor(private readonly deployServise: DeployService, private readonly logServise: LogService) { }

	async deploy() {
		return await this.deployServise.deploy()
	}

	async getLogs(recCnt?: number) {
		return await this.logServise.getLogs(recCnt);
	}

	getHello() {
		return 'Welcome to serguius.ru!';
	}
}
