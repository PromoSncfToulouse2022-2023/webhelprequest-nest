import { Controller, Get, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController 
{
    constructor (
        private readonly appService: AppService
    )
    { }

    @Get()
    getHello(): string 
    {
        return this.appService.getHello();
    }

    
}
