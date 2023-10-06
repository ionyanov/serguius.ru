export class AuthDto {
	email: string;
	password: string;
}

export class RefreshTokenDto {
	refreshToken: string;
}

export class PasswordDto extends AuthDto {
	newPassword: string;
}
