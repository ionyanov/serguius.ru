import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PictureService } from 'src/picture/picture.service';
import { SettingsService } from 'src/settings/settings.service';

@Controller('nextapi')
export class NextapiController {
  constructor(private readonly categoryService: CategoryService,
    private readonly pictureService: PictureService,
    private readonly settingsService: SettingsService) { }

  @Get('mainmenu')
  getMenu() {
    return this.categoryService.getMenu();
  }

  @Get('category/:category')
  async getCategory(@Param('category') category: string) {
    const categories = await this.categoryService.getCategories({ link: category })
    return categories[0];
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

  @Get('settings/:settings')
  public async getSettings(@Param('settings') settings: string) {
    return this.settingsService.getSettings(settings);
  }
}
