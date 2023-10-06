export class UserDto {
	email: string;
	password: string;
	avarat: string;
}

export class AdminUserDto {
	id: number;
	created: Date;
	updated: Date;
	email: string;
	password: string;
	lockcount: number;
	lockflg: boolean;
	lastlogin: Date;
}
