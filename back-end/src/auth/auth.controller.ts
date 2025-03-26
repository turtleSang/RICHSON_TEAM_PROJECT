import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtGuard } from './jwt/jwt.guard';
import { GoogleGuard } from './google/google.guard';
import { UserEntity } from 'src/user/entity/user.entity';
import { RoleGuard } from './roles/roles.guard';
import { Role, Roles } from './roles/roles.decorator';
import { ValidatorPipe } from 'src/pipes/validator.pipe';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }
  @Get('google')
  @UseGuards(GoogleGuard)
  async loginGoogle(@Req() req: Request) { }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async callbackGooogle(@Req() req: any) {
    const user = req.user;
    return await this.authService.callbackGoogle(user);
  }

  @Get("profile")
  @UseGuards(JwtGuard)
  async getProfile(@Req() req: any) {
    const { id } = req.user
    const { name, email, avatar }: UserEntity = await this.authService.getProfile(id);
    return { name, email, avatar, id }
  }

  @Post("upgrade/:id")
  @UseGuards(JwtGuard, RoleGuard)
  @Roles("admin")
  async upgradeProfile(@Param('id', ParseIntPipe) id: number, @Body(ValidatorPipe) data: { newRole: Role }) {
    return await this.authService.upgradeProfile(data.newRole, id);
  }

}
