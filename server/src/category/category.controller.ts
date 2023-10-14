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

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

	@Auth()
	@HttpCode(200)
	@Get()
	getCategories() {
		return this.categoryService.getCategories();
	}

	@Auth()
	@Get(':category')
	getCategory(@Param('category') category: string) {
		return this.categoryService.getCategories({ link: category })[0];
	}

	@Auth()
	@HttpCode(200)
	@Post()
	setCategory(@Body() categoryDto: CategoryDto) {
		return this.categoryService.setCategory(categoryDto);
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	delCategory(@Param('id') id: string) {
		return this.categoryService.delCategory(+id);
	}

	@Auth()
	@HttpCode(200)
	@Post(':id/:duration')
	moveCategory(@Param('id') id: string, @Param('duration') duration: string) {
		return this.categoryService.moveCategory(
			+id,
			duration == 'up' ? 'up' : 'down',
		);
	}
}
