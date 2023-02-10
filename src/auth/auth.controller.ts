import { Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TransformInterceptor } from '../interceptor/TransformInterceptor';

@Controller('auth')
@ApiTags('AUTH') // cree une categorie AUTH dans swagger UI
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
export class AuthController
{
    constructor (private authService: AuthService) { }

    @UseGuards(LocalAuthGuard) // verifie que l'user existe
    @ApiBody({ type: CreateUserDto }) // verifie les données envoyées par le client
    @Post('login')
    async login(@Request() req)
    {
        return this.authService.login(req.user);
    }
}
