import { Module } from '@nestjs/common';
import { NextapiController } from './nextapi.controller';
import { CategoryService } from 'src/category/category.service';
import { PictureService } from 'src/picture/picture.service';
import { PrismaService } from 'src/prisma.service';
import { LogService } from 'src/log.service';
import { FileService } from 'src/file.service';

@Module({
  controllers: [NextapiController],
  providers: [PrismaService, LogService, CategoryService, FileService, PictureService],
})
export class NextapiModule { }
