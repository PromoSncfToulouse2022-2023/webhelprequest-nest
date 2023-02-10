import { ApiHideProperty, ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Ticket } from "../../tickets/entities/ticket.entity"

export class CreateUserDto 
{
    @IsNotEmpty()
    @ApiProperty()
    username: string
    
    @IsNotEmpty()
    @ApiProperty()
    password: string
}
