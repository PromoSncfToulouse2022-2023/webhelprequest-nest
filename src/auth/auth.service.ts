import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as argon2 from "argon2";


@Injectable()
export class AuthService
{
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any>
    {
        const user = await this.usersService.findOneByUsername(username);

        if (!user)
        {
            throw new ForbiddenException('No user with this name');
        }

        const isPasswordVerified = await argon2.verify(user.password, password);

        if (isPasswordVerified)
        {
            const { password, ...result } = user;
            return result;
        }
        else
        {
            throw new ForbiddenException('Incorrect password');
        }
    }

    async login(user: any)
    {
        const payload = { username: user.username, userId: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
