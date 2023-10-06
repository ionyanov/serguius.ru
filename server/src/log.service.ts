import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class LogService {
	constructor(private readonly prisma: PrismaService) {}

	async LogMessage(e: any, msg?: string) {
		if (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					throw new InternalServerErrorException(msg ?? e.message);
				}
			}
			throw e;
		}
	}
}
