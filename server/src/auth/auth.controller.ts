import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, PasswordDto, RefreshTokenDto } from './auth.dto';
import { Auth, CurrentUser } from 'src/_security';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('register')
	async register(@Body() body: AuthDto) {
		console.log(body);
		return this.authService.register(body);
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() body: AuthDto) {
		return this.authService.login(body);
	}

	@HttpCode(200)
	@Post('refresh')
	async getNewToken(@Body() body: RefreshTokenDto) {
		return this.authService.getNewToken(body);
	}

	@Auth()
	@HttpCode(200)
	@Get('profile/:id')
	async getProfile(@CurrentUser('id') @Param('id') id: string) {
		return this.authService.getProfile(id);
	}

	@Auth()
	@HttpCode(200)
	@Post('changepass')
	async setPassword(@Body() passwordDto: PasswordDto) {
		return this.authService.setPassword(passwordDto);
	}
}
