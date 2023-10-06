import {
	Injectable,
	CanActivate,
	ExecutionContext,
	SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const HasRoles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			'roles',
			[context.getHandler(), context.getClass()],
		);
		if (!requiredRoles) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return requiredRoles.some(role => user?.role == role);
	}
}
