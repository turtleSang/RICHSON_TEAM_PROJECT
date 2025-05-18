import { Body, Controller, Get, Param, ParseIntPipe, Query, UseGuards, Put } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Role, Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { ValidatorPipe } from 'src/pipes/validator.pipe';
import { UserService } from './user.service';
import { UpgradeUserDto } from './dto/upgrade-user-dto';

@Controller('api/user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get('/list')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles('admin')
    async getListUser(
        @Query('pageNumber', ParseIntPipe) pageNumber: number,
        @Query('pageSize', ParseIntPipe) pageSize: number
    ) {
        return this.userService.getListUser(pageSize, pageNumber);
    }

    @Get('/list/:name')
    async getListByName(
        @Query('pageNumber', ParseIntPipe) pageNumber: number,
        @Query('pageSize', ParseIntPipe) pageSize: number,
        @Param('name') name: string
    ) {
        return this.userService.getListUser(pageSize, pageNumber, name);
    }

    @Put("upgrade/:id")
    @UseGuards(JwtGuard, RoleGuard)
    @Roles("admin")
    async upgradeProfile(@Param('id') userId: number, @Body(ValidatorPipe) upgradeUse: UpgradeUserDto) {
        return await this.userService.upgradeProfile(upgradeUse.newRole, userId);
    }
}
