import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService
{
    async create(createTicketDto: CreateTicketDto): Promise<Ticket>
    {
        return await Ticket.create({...createTicketDto}).save();
    }

    async findAll()
    {
        return await Ticket.find();
    }

    async findOne(id: number)
    {
        return await Ticket.findOneBy({ id });
    }

    async update(id: number, updateTicketDto: UpdateTicketDto)
    {
        const ticket = await this.findOne(id);
        ticket.message = updateTicketDto.message;
        return await ticket.save();
    }

    async remove(id: number)
    {
        const ticket = await this.findOne(id);

        if(ticket)
        {
            return await ticket.remove();
        }

        return undefined;
    }
}
