import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, LogService],
	exports: [UserService],
})
export class UserModule {}
