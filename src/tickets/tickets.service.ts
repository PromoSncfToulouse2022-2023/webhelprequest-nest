import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService
{
    async create(createTicketDto: CreateTicketDto): Promise<Ticket>
    {
        try
        {
            return await Ticket.create({ ...createTicketDto }).save();
        }
        catch (error)
        {
            throw new InternalServerErrorException();
        }

    }

    async findAll()
    {
        try
        {
            return await Ticket.find({
                relations: {
                    user: true
                }
            });
        }
        catch (error)
        {
            throw new InternalServerErrorException();
        }
    }

    async findOne(id: number)
    {
        try
        {
            return await Ticket.findOneByOrFail({ id });
        }
        catch (error)
        {
            throw new NotFoundException();
        }
    }

    async update(id: number, updateTicketDto: UpdateTicketDto, user: User)
    {
        const ticket = await Ticket.findOneBy({ id });

        if (!ticket) throw new NotFoundException();

        if (ticket.user.id !== user.id) throw new ForbiddenException();

        ticket.message = updateTicketDto.message;

        try
        {
            return await ticket.save();
        }
        catch (error)
        {
            throw new InternalServerErrorException();
        }
    }

    async remove(id: number, user: User)
    {
        const ticket = await Ticket.findOne({
            where: { id: id },
            relations: {
                user: true
            }
        });

        if (!ticket) throw new NotFoundException();

        if (ticket.user.id !== user.id) throw new ForbiddenException();

        try
        {
            return await ticket.remove();
        }
        catch (error) 
        {
            throw new InternalServerErrorException();
        }
    }
}
