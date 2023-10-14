import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LogType, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class LogService {
	constructor(private readonly prisma: PrismaService) { }

	async LogMessage(e?: any, msg?: string, type?: LogType) {
		if (msg)
			await this.prisma.logs.create({
				data: {
					message: `${msg}:${JSON.stringify(e)}`,
					type: type ?? 'INFO'
				}
			})
		if (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					throw new InternalServerErrorException(msg ?? e.message);
				}
			}
			throw e;
		}
	}

	async getLogs(recCnt?: number) {
		const result = this.prisma.logs.findMany({
			take: 100,
			orderBy: {
				created: 'desc'
			}
		})
		return result;
	}
}
