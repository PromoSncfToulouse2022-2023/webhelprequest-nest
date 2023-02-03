import { PrimaryGeneratedColumn, PrimaryColumn, Entity, BaseEntity } from 'typeorm';

@Entity()
export class Ticket extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    message: string;
}
