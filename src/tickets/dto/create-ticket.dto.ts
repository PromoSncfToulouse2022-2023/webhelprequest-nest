import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTicketDto 
{
    @ApiProperty()
    @IsNotEmpty()
    message: string;
}
