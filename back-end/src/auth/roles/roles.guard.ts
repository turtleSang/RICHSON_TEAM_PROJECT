import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "./roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<Role[]>('Roles', context.getHandler());
        if (!requiredRoles) {
            return true
        }
        const { role } = context.switchToHttp().getRequest().user;

        return requiredRoles.includes(role);
    }

}