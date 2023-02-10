import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authService: AuthService)
    {
        super({ usernameField: 'username', passwordField: 'password' }); 
        // Passport utilise 'username' et 'password' par defaut
        // Mais vous pouvez specifier une autre clé ex: usernameField: 'email'
    }

    async validate(username: string, password: string): Promise<any>
    {
        return await this.authService.validateUser(username, password);
    }
}