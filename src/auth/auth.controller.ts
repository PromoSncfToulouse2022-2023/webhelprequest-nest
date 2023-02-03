import { Controller, Get, HttpException, HttpStatus, NotAcceptableException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import * as argon2 from "argon2";
import { UsersService } from 'src/users/users.service';
import { HttpExceptionFilter } from 'src/errors/http-exception.filter';

@Controller('auth')
export class AuthController
{
    constructor (
        private authService: AuthService,
        private usersService: UsersService,
    )
    { }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req)
    {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req)
    {
        return req.user;
    }
}
