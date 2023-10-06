import {IUser} from "@/entities/User";

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: IUser,
	accessToken: string;
	refreshToken: string;
}

export interface RefreshToken {
	refreshToken: string;
}

export interface LoginSchema {
	username: string;
	password: string;
	isLoading: boolean;
	error?: string;
}
