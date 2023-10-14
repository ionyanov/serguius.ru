import { Injectable } from '@nestjs/common';
//import { existsSync, unlinkSync } from 'fs';
//import { resolve } from 'path';
import { spawn } from 'node:child_process';
import { LogService } from './log.service';

@Injectable()
export class DeployService {
	constructor(private readonly logger: LogService) { }

	async deploy() {
		let result: string[] = [];
		const command = spawn(process.env.DEPLOY_CMD, { shell: true })
		command.on('close', data => {
			this.logger.LogMessage(undefined, `Close: ${data}`)
		})
		command.stdout.on('data', data => {
			this.logger.LogMessage(undefined, `${data}`)
		})
		command.stderr.on('data', data => {
			this.logger.LogMessage(undefined, `${data}`, 'ERROR')
		});

		return result;
	}
}
