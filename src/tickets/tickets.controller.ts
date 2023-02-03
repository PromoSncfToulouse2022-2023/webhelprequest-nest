import
{
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.auth.guard';

@Controller('tickets')
export class TicketsController 
{
    constructor (private readonly ticketsService: TicketsService)
    { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createTicketDto: CreateTicketDto) 
    {
        return await this.ticketsService.create(createTicketDto);
    }

    @Get()
    async findAll() 
    {
        return await this.ticketsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) 
    {
        return this.ticketsService.findOne(+id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) 
    {
        return this.ticketsService.update(+id, updateTicketDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) 
    {
        return this.ticketsService.remove(+id);
    }
}
