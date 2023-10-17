import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { existsSync, unlinkSync, mkdir } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

export interface fileOperationResult {
	width?: number,
	height?: number,
	error?: any,
}

@Injectable()
export class FileService {
	constructor() { }

	delFile(fileName: string) {
		let file = this.getFilePath(fileName);
		if (existsSync(file)) unlinkSync(file);
		file = this.getPreviewPath(fileName);
		if (existsSync(file)) unlinkSync(file);
		file = this.getPublicPath(fileName);
		if (existsSync(file)) unlinkSync(file);
	}

	async createPreview(fileName: string): Promise<fileOperationResult> {
		let result: fileOperationResult = {};
		const fullFileName = this.getFilePath(fileName);
		const newFilePath = this.getPreviewPath(fileName);
		const image = await sharp(fullFileName)
			.resize({
				width: Number.parseInt(process.env.PREVIEW_SIZE ?? '400'),
				height: Number.parseInt(process.env.PREVIEW_SIZE ?? '400'),
				position: sharp.strategy.entropy
			})
			.toFile(newFilePath);
		return result;
	}

	async createPublic(fileName: string): Promise<fileOperationResult> {
		let result: fileOperationResult = {};
		const fullFileName = this.getFilePath(fileName);
		const newFilePath = this.getPublicPath(fileName);
		try {
			let metadata = await sharp(fullFileName).metadata();
			const image = await sharp(fullFileName)
				.resize({
					width: Number.parseInt(process.env.PUBLIC_SIZE ?? '1000'),
					height: Number.parseInt(process.env.PUBLIC_SIZE ?? '1000'),
					fit: sharp.fit.inside,
					position: sharp.strategy.entropy
				})
				.toFile(newFilePath);
			metadata = await sharp(newFilePath).metadata();
			result.height = metadata.height;
			result.width = metadata.width;
		} catch (error) {
			result.error = error;
		}
		return result;
	}

	async addWatermark(fileName: string): Promise<fileOperationResult> {
		let result: fileOperationResult = {};
		const fullFileName = this.getFilePath(fileName);
		const newFilePath = this.getPublicPath(fileName);
		try {
			let metadata = await sharp(fullFileName).metadata();
			const image = await sharp(fullFileName)
				.composite([
					{
						input: {
							text: {
								text: `<span foreground="#d2d0d0" alpha="10%">${process.env.WATERMARK_TEXT}</span>`,
								rgba: true,
								width: metadata.width,
								height: metadata.height / 3,
							},
						},
						tile: true,
					},
				])
				.toFile(newFilePath);
		} catch (error) {
			result.error = error;
		}
		return result;
	}

	private getFilePath(fileName): string {
		if (!existsSync(process.env.UPLOAD_DIR)) mkdir(process.env.UPLOAD_DIR, (error => { throw error }));
		return resolve(process.env.UPLOAD_DIR, fileName);
	}

	private getPreviewPath(fileName): string {
		if (!existsSync(process.env.PREVIEW_DIR)) mkdir(process.env.PREVIEW_DIR, (error => { throw error }));
		return resolve(process.env.PREVIEW_DIR, fileName);
	}

	private getPublicPath(fileName): string {
		if (!existsSync(process.env.PUBLIC_DIR)) mkdir(process.env.PUBLIC_DIR, (error => { throw error }));
		return resolve(process.env.PUBLIC_DIR, fileName);
	}
}
