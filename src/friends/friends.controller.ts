import
    {
        Controller, Get, Post, Body, Param, Delete, UseGuards,
        UseInterceptors, ClassSerializerInterceptor, NotFoundException
    } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../interceptor/TransformInterceptor';

@Controller('friends')
@ApiTags('FRIENDS') // cree une categorie TICKETS dans swagger UI
@UseInterceptors(ClassSerializerInterceptor) // Ne renvoie pas les proprietes d'une entité marquées par @Exclude()
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
export class FriendsController
{
    constructor (
        private readonly friendsService: FriendsService,
        private readonly usersService: UsersService
    ) { }

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @ApiBody({ type: CreateFriendDto }) // fournit le type de body a swagger UI
    @Post()
    async askForFriend(@Body() createFriendDto: CreateFriendDto, @GetUser() user: User)
    {
        const friend = await this.usersService.findOneByUsername(createFriendDto.friend);

        if (!friend) throw new NotFoundException();

        return this.friendsService.create(user, friend);
    }

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @Get()
    async findMyFriends(@GetUser() user: User)
    {
        return (await this.friendsService.findMyFriends(user))
            .map(elm => elm.user.id !== user.id ? elm.user : elm.friend)
    }

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @Get('/request')
    getFriendRequests(@GetUser() user: User)
    {
        return this.friendsService.getFriendRequests(user);
    }

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @Get('/request/:id')
    acceptFriendRequest(@Param('id') id: string)
    {
        return this.friendsService.acceptFriendRequest(+id);
    }

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: User)
    {
        return this.friendsService.removeFriend(+id, user);
    }
}
