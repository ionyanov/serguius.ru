import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PictureService } from 'src/picture/picture.service';

@Controller('nextapi')
export class NextapiController {
  constructor(private readonly categoryService: CategoryService, private readonly pictureService: PictureService) { }

  @Get('mainmenu')
  getMenu() {
    return this.categoryService.getMenu();
  }

  @Get('category/:category')
  getCategory(@Param('category') category: string) {
    return this.categoryService.getCategories({ link: category })[0];
  }

  @Get('picture')
  public async getAllPictures() {
    return this.pictureService.getPictures();
  }

  @Get('picture/id/:id')
  public async getPicturesById(@Param('id') id: string) {
    return this.pictureService.getPicturesById(+id);
  }

  @Get('picture/:category')
  public async getPictures(@Param('category') category: string) {
    return this.pictureService.getPictures(category);
  }

  @Get('random/:count')
  public async getRandom(@Param('count') count: string) {
    return this.pictureService.getRandom(+count);
  }
}
