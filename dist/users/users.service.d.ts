import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): string;
    findOneById(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
