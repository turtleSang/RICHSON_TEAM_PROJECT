import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Role } from './roles/roles.decorator';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async registerJwtToken(payload: object) {
        return await this.jwtService.signAsync(payload)
    }

    async callbackGoogle(user: { name: string, email: string, avatar: string, role: Role, googleId: string }) {
        let userEntity: UserEntity = await this.userService.findOneByEmail(user.email);
        if (!userEntity) {

            userEntity = await this.userService.createWithGoogle(user);
        }
        const token = await this.registerJwtToken({ id: userEntity.id, role: userEntity.role });
        return { token };
    }

    async getProfile(id: number): Promise<UserEntity> {
        try {
            return await this.userService.findOneById(id)
        } catch (error) {
            throw new BadRequestException('Server errors')
        }
    }


}
