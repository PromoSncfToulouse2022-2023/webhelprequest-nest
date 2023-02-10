import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"

@Entity()
export class Friend extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isFriend: boolean;

    @ManyToOne(() => User, (user) => user.users)
    user: User

    @ManyToOne(() => User, (user) => user.friends)
    friend: User;
}
