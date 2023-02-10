import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService 
{
    create(createUserDto: CreateUserDto) 
    {
        try
        {
            return User.create({ ...createUserDto }).save();
        } 
        catch (error)
        {
            throw new InternalServerErrorException();
        }
    }
    
    async findOneById(id: number) 
    {
        try
        {
            return await User.findOneBy({ id });
        } 
        catch (error)
        {
            throw new InternalServerErrorException();
        }
    }

    async findOneByUsername(username: string) 
    {
        try
        {
            return await User.findOneBy({ username });
        } 
        catch (error)
        {
            throw new InternalServerErrorException();
        }
    }

    async remove(id: number) 
    {
        try
        {
            const user = await this.findOneById(id);

            if (user)
            {
                return await user.remove();
            }

            return null;
        } 
        catch (error)
        {
            throw new InternalServerErrorException();
        }
    }

    async profile(id: number) 
    {
        try
        {
            return await User.findOne({
                where: {
                    id: id
                },
                relations: {
                    tickets: true
                }
            });
        } 
        catch (error)
        {
            throw new InternalServerErrorException();
        }
    }
}
