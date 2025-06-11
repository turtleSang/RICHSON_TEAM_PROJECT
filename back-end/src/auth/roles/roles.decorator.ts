import { SetMetadata } from "@nestjs/common";

export type Role = 'admin' | 'viewer' | 'member';

export const allowedRoles: Role[] = ["admin", "member", "viewer"]

export const Roles = (...roles: Role[]) => SetMetadata('Roles', roles);