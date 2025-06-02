import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback } from "passport-google-oauth2"
import { Role } from "../roles/roles.decorator"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
        super({
            clientID: process.env.GOOGLE_APP_ID,
            clientSecret: process.env.GOOGLE_APP_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        })
    }

    authorizationParams(): Record<string, string> {
        return {
            prompt: 'select_account',
        };
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        const { name, emails, photos, id } = profile;
        const role: Role = process.env.ROOT_ADMIN === emails[0].value ? 'admin' : 'viewer';
        const user: { email: string, name: string, googleId: string, avatar: string, role?: Role } = {
            googleId: id,
            email: emails[0].value,
            name: `${name.familyName} ${name.givenName}`,
            avatar: photos[0].value,
            role
        }
        done(null, user, { message: 'successfull' })
    }

}