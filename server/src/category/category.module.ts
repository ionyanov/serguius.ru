import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';
import { LogService } from 'src/log.service';

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, PrismaService, LogService],
})
export class CategoryModule {}
