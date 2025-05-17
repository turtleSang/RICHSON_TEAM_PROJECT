import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/auth/roles/roles.decorator';
import { take } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }

    async findOneById(id: number) {
        return await this.userRepository.findOneByOrFail({ id });
    }

    async getListUser(pageSize: number, pageNumber: number,) {
        const [users, total] = await this.userRepository.findAndCount({
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            order: {
                createAt: 'DESC'
            }
        });
        const totalPage = Math.ceil(total / pageSize)
        return {
            listUser: users, totalPage
        }
    }



    async createWithGoogle(user: { googleId: string, name: string, email: string, avatar: string, role: Role, }) {
        try {
            const newUser = await this.userRepository.save({
                avatar: user.avatar,
                email: user.email,
                name: user.name,
                role: user.role,
                googleId: user.googleId
            })
            return newUser;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async upgradeProfile(newRole: Role, id: number) {
        let user = await this.userRepository.findOneBy({ id })
        if (!user) {
            throw new NotFoundException("Not found user")
        }
        user = { ...user, role: newRole };
        await this.userRepository.save(user);
        return `User ${user.name} was updated`;

    }

}
