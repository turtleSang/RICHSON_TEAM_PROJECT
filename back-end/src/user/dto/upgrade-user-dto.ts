import { IsIn, IsNumber } from "class-validator";
import { allowedRoles, Role } from "src/auth/roles/roles.decorator";


export class UpgradeUserDto {
    @IsIn(allowedRoles, {
        message: 'Role not allowed'
    })
    newRole: Role
}