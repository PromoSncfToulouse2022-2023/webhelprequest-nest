import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from "argon2";
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController
{
    constructor (private readonly usersService: UsersService)
    { }

    @Post('/register')
    @ApiResponse({ status: 201, description: 'foiré.' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: User,
      })
    async create(@Body() createUserDto: CreateUserDto)
    {
        const hash = await argon2.hash(createUserDto.password);

        createUserDto.password = hash;

        return this.usersService.create(createUserDto);
    }

    @Post('/login')
    login(@Body() createUserDto: CreateUserDto)
    {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto)
    {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.usersService.remove(+id);
    }
}
