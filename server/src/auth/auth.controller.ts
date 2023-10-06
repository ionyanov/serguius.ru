import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, PasswordDto, RefreshTokenDto } from './auth.dto';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(@Body() body: AuthDto) {
		return this.authService.register(body);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() body: AuthDto) {
		return this.authService.login(body);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('refresh')
	async getNewToken(@Body() body: RefreshTokenDto) {
		return this.authService.getNewToken(body);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('changepass')
	async setPassword(@Body() passwordDto: PasswordDto) {
		return this.authService.setPassword(passwordDto);
	}
}
