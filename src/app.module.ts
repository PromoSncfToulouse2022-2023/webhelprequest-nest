import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [join(__dirname, '**', '*.entity.{ts,js}')],
            synchronize: true,
            logging: false,
        }),
        TicketsModule,
        UsersModule,
        AuthModule,
        FriendsModule,
    ]
})
export class AppModule 
{
    constructor()
    {
        console.log([join(__dirname, '**', '*.entity.{ts,js}')],);
    }
    
    
}
