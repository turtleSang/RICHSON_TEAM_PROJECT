import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private configsService: ConfigService) {
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configsService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' }
        }
    }

}