import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LogService } from 'src/log.service';
import { AuthDto, PasswordDto, RefreshTokenDto } from './auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userSrv: UserService,
		private readonly jwt: JwtService,
		private readonly logger: LogService,
	) {}

	async register(body: AuthDto) {
		let user: User;
		let tokens: any;
		try {
			if (!body.email)
				throw new BadRequestException('User cant be empty');

			const oldUser = await this.userSrv.getUserByEmail(body.email);
			if (oldUser) throw new BadRequestException('User already exists');

			user = await this.userSrv.create(body.email, body.password);
		} catch (e) {
			await this.logger.LogMessage(e, 'Can`t register user!');
		}

		return { user: this.userSrv.returnAuthUserFields(user) };
	}

	async login(body: AuthDto) {
		const user = await this.userSrv.validateUser(body.email, body.password);
		const tokens = await this.issueTokes(user.id);

		return { user: this.userSrv.returnAuthUserFields(user), ...tokens };
	}

	async getProfile(userId: string) {
		let user: User;
		try {
			if (!userId) throw new BadRequestException('Can`t find user!');
			user = await this.userSrv.getUserById(+userId);
		} catch (e) {
			await this.logger.LogMessage(e, 'Can`t find user!');
		}
		return this.userSrv.returnAuthUserFields(user);
	}

	async setPassword(dataDto: PasswordDto) {
		try {
			let user: User = await this.userSrv.validateUser(
				dataDto.email,
				dataDto.password,
			);
			if (!user) throw new ForbiddenException('Wrong credencial!');
			await this.userSrv.setPassword(user.id, dataDto.newPassword);
		} catch (e) {
			await this.logger.LogMessage(e, 'Can`t set password!');
		}
		return 'success';
	}

	async getNewToken(body: RefreshTokenDto) {
		const result = await this.jwt.verifyAsync(body.refreshToken, {
			secret: process.env.TOKEN_REFRESH_KEY,
		});
		if (!result) throw new UnauthorizedException('Sessions expire');

		const user = await this.userSrv.getUserById(result.id);
		const tokens = await this.issueTokes(user.id);

		return { user: this.userSrv.returnAuthUserFields(user), ...tokens };
	}

	private async issueTokes(userId: number) {
		const data = { id: userId };

		const accessToken = this.jwt.sign(data, {
			expiresIn: process.env.TOKEN_DURATION,
		});
		const refreshToken = this.jwt.sign(data, {
			expiresIn: process.env.TOKEN_REFRESH_DURATION,
			secret: process.env.TOKEN_REFRESH_KEY,
		});

		return { accessToken, refreshToken };
	}
}
