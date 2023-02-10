import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Friend } from '../../friends/entities/friend.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity('users')
export class User extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()
    @ApiHideProperty()
    password: string;

    @OneToMany(type => Ticket, ticket => ticket.user)
    tickets: Ticket[];

    @OneToMany(() => Friend, (friend) => friend.user)
    users: User[];

    @OneToMany(() => Friend, (friend) => friend.friend)
    friends: User[];
}
