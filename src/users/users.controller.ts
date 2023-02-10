import
{
    Controller, Get, Post, Body, Param, Delete, UseGuards,
    ClassSerializerInterceptor, UseInterceptors, Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from "argon2";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.auth.guard';
import { TransformInterceptor } from '../interceptor/TransformInterceptor';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // Ne renvoie pas les proprietes d'une entité marquées par @Exclude()
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('USERS') // cree une categorie USERS dans swagger UI
export class UsersController
{
    constructor (private readonly usersService: UsersService)
    { }

    @Post('/register')
    async create(@Body() createUserDto: CreateUserDto)
    {
        const hash = await argon2.hash(createUserDto.password);

        createUserDto.password = hash;

        return await this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.usersService.remove(+id);
    }

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @Get('/profile')
    async profile(@GetUser() user: User)
    {
        return await this.usersService.profile(user.id);
    }
}
