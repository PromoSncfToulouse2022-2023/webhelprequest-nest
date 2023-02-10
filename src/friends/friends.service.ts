import { Injectable, NotFoundException } from '@nestjs/common';
import { userInfo } from 'os';
import { User } from '../users/entities/user.entity';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendsService
{
    async create(user: User, friend: User)
    {
        return await Friend.create({ user, friend }).save();
    }

    async findMyFriends(user: User)
    {
        return await Friend.find({
            where: [{ // use an array for a where or 
                isFriend: true,
                user: {
                    id: user.id,
                },
            },
            {
                isFriend: true,
                friend: {
                    id: user.id
                }
            }],
            relations: {
                user: true,
                friend: true
            }
        })
    }

    async getFriendRequests(user: User)
    {
        return await Friend.find({
            where: {
                isFriend: false,
                friend: {
                    id: user.id,
                },
            },
            relations: {
                user: true
            }
        })
    }

    async acceptFriendRequest(id: number)
    {
        const friend = await Friend.findOneBy({id});

        if(!friend) throw new NotFoundException();

        friend.isFriend = true;

        return await friend.save();
    }

    async removeFriend(id: number, user: User)
    {
        const friend = await Friend.findOne({
            where: {
                user: {
                    id: user.id
                },
                friend: {
                    id: id
                }
            }
        });

        if(!friend) throw new NotFoundException();
        
        friend.remove();
    }
}
