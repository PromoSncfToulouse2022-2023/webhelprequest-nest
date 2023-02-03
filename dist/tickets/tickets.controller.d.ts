import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto): Promise<import("./entities/ticket.entity").Ticket>;
    findAll(): Promise<import("./entities/ticket.entity").Ticket[]>;
    findOne(id: string): Promise<import("./entities/ticket.entity").Ticket>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<import("./entities/ticket.entity").Ticket>;
    remove(id: string): Promise<import("./entities/ticket.entity").Ticket>;
}
