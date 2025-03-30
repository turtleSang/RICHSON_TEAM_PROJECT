import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: Boolean(process.env.JWT_IGNORE_EXPIRATION),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = { id: payload.id, role: payload.role };
        return user;
    }
}