import { PrimaryGeneratedColumn, PrimaryColumn, Entity, BaseEntity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Ticket extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    message: string;

    @ManyToOne(() => User, (user) => user.tickets)
    user: User
}
