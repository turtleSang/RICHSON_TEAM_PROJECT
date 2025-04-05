import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Role, Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { ValidatorPipe } from 'src/pipes/validator.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post("upgrade/:id")
    @UseGuards(JwtGuard, RoleGuard)
    @Roles("admin")
    async upgradeProfile(@Param('id', ParseIntPipe) id: number, @Body(ValidatorPipe) data: { newRole: Role }) {
        return await this.userService.upgradeProfile(data.newRole, id);
    }
}
