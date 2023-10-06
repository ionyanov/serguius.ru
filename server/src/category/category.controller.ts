import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
import { Auth } from 'src/_security';

@Controller()
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@HttpCode(200)
	@Get('mainmenu')
	getMenu() {
		return this.categoryService.getMenu();
	}

	@Auth()
	@HttpCode(200)
	@Get('category')
	getCategories() {
		return this.categoryService.getAll();
	}

	@Auth()
	@HttpCode(200)
	@Post('category')
	upsertCategory(@Body() categoryDto: CategoryDto) {
		return this.categoryService.upsert(categoryDto);
	}

	@Auth()
	@HttpCode(200)
	@Delete('category/:id')
	removeCategory(@Param('id') id: string) {
		return this.categoryService.remove(+id);
	}
}
