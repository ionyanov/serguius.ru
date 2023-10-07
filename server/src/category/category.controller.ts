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
	constructor(private readonly categoryService: CategoryService) { }

	@HttpCode(200)
	@Get('mainmenu')
	getMenu() {
		return this.categoryService.getMenu();
	}

	@Auth()
	@HttpCode(200)
	@Get('category')
	getCategories() {
		return this.categoryService.getCategories();
	}

	@Auth()
	@HttpCode(200)
	@Post('category')
	setCategory(@Body() categoryDto: CategoryDto) {
		return this.categoryService.setCategory(categoryDto);
	}

	@Auth()
	@HttpCode(200)
	@Delete('category/:id')
	delCategory(@Param('id') id: string) {
		return this.categoryService.delCategory(+id);
	}

	@Auth()
	@HttpCode(200)
	@Post('category/:id/:duration')
	moveCategory(@Param('id') id: string, @Param('duration') duration: string) {
		return this.categoryService.moveCategory(+id, duration == 'up' ? 'up' : 'down');
	}
}
