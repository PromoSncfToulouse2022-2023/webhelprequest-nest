import { IsNotEmpty } from "class-validator";

export class CreateTicketDto 
{
    @IsNotEmpty()
    message: string;
}
