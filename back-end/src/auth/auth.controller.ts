import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtGuard } from './jwt/jwt.guard';
import { GoogleGuard } from './google/google.guard';
import { UserEntity } from 'src/user/entity/user.entity';
import { ConfigService } from '@nestjs/config';



@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService
  ) { }
  @Get('google')
  @UseGuards(GoogleGuard)
  async loginGoogle(@Req() req: Request) { }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async callbackGooogle(@Req() req: any, @Res() res: Response) {
    const user = req.user;
    const homeUrl = this.configService.get<string>('FRONT_END_URL');
    const token = await this.authService.callbackGoogle(user);
    res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'none' })
    res.redirect(homeUrl);
  }

  @Get("profile")
  @UseGuards(JwtGuard)
  async getProfile(@Req() req: any) {
    const { id } = req.user
    const { name, email, avatar, role }: UserEntity = await this.authService.getProfile(id);
    return { name, email, avatar, id, role }
  }

  @Get('logout')
  @UseGuards(JwtGuard)
  async Logout(@Res() res: Response) {
    res.clearCookie('access_token')
    res.send({ mess: 'was logout' })
  }

}
