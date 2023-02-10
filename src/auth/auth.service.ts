import { ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as argon2 from "argon2";
import { User } from '../users/entities/user.entity';


@Injectable()
export class AuthService
{
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<Partial<User>>
    {
        try
        {
            const user = await this.usersService.findOneByUsername(username);

            if (!user) throw new ForbiddenException('No user with this name');

            const isPasswordVerified = await argon2.verify(user.password, pass);

            if (!isPasswordVerified) throw new ForbiddenException('Incorrect password');

            const { password, ...result } = user;

            return result;
        }
        catch (error)
        {
            throw new InternalServerErrorException();
        }
    }

    async login(user: any)
    {
        try
        {
            const payload = { username: user.username, userId: user.id };

            return { access_token: this.jwtService.sign(payload) };
        }
        catch (error)
        {
            throw new InternalServerErrorException();
        }
    }
}
