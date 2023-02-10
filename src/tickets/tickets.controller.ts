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
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.auth.guard';
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { TransformInterceptor } from '../interceptor/TransformInterceptor';

@Controller('tickets')
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('TICKETS') // cree une categorie TICKETS dans swagger UI
@UseInterceptors(ClassSerializerInterceptor) // Ne renvoie pas les proprietes d'une entité marquées par @Exclude()
export class TicketsController 
{
    constructor (private readonly ticketsService: TicketsService)
    { }

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @ApiBody({ type: CreateTicketDto }) // fournit le type de body a swagger UI
    @UsePipes(new ValidationPipe({ transform: true })) // verifie les données envoyées par le client
    @Post()
    async create(@Body() createTicketDto, @GetUser() user: User) 
    {
        createTicketDto.user = user;

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

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @ApiBody({ type: UpdateTicketDto }) // fournit le type de body a swagger UI
    @UsePipes(new ValidationPipe({ transform: true })) // verifie les données envoyées par le client
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto, @GetUser() user: User) 
    {
        return this.ticketsService.update(+id, updateTicketDto, user);
    }

    @UseGuards(JwtAuthGuard) // verifie que le token est valide
    @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: User) 
    {
        return this.ticketsService.remove(+id, user);
    }
}
