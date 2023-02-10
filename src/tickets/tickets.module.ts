import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [TicketsController],
    providers: [TicketsService]
})
export class TicketsModule
{ }
