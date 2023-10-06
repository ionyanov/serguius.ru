import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminUserDto, UserDto } from './user.dto';
import { Auth, CurrentUser } from 'src/_security/decorators';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(':id')
	async updateOne(
		@CurrentUser('id') @Param('id') id: string,
		@Body() userDto: UserDto,
	) {
		return this.userService.updateOne(+id, userDto);
	}

	@Auth()
	@HttpCode(200)
	@Get()
	async getUsers() {
		return this.userService.getUsers();
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async update(@Body() userDto: AdminUserDto) {
		return this.userService.update(userDto);
	}
}
