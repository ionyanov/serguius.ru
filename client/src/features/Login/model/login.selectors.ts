import { StateSchema } from "@/app/providers/StoreProvider";

export function getError(state: StateSchema): string {
	return state?.loginForm?.error || '';
}

export function getIsLoading(state: StateSchema): boolean {
	return state?.loginForm?.isLoading || false;
}

export function getPassword(state: StateSchema): string {
	return state?.loginForm?.password || '';
}

export function getUserName(state: StateSchema): string {
	return state?.loginForm?.username || '';
}
