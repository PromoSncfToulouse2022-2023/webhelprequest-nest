import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (private readonly usersService: UsersService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.TOKEN_SECRET,
        });
    }

    async validate(payload: any)
    {
        const { userId } = payload;

        const user = this.usersService.findOneById(userId);

        if (!user) throw new UnauthorizedException();

        return user;
    }
}
