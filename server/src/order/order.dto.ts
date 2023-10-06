import { IsEmail, IsString, MaxLength } from 'class-validator';

export class OdrerDto {
	@IsEmail()
	email: string;

	@MaxLength(4000, { message: 'Too long email text!' })
	@IsString()
	text: string;
}
