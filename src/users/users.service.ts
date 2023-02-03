import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService 
{
    create(createUserDto: CreateUserDto) 
    {
        return User.create({...createUserDto}).save();
    }

    findAll() 
    {
        return `This action returns all users`;
    }

    async findOneById(id: number) 
    {
        return await User.findOneBy({id});
    }

    async findOneByUsername(username: string) 
    {
        return await User.findOneBy({username});
    }

    update(id: number, updateUserDto: UpdateUserDto) 
    {
        return `This action updates a #${id} user`;
    }

    remove(id: number) 
    {
        return `This action removes a #${id} user`;
    }
}
