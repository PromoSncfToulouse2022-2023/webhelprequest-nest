import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './errors/http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { corsConfig } from './constants/cors-config';

async function bootstrap() 
{
    ConfigModule.forRoot();
    const port = process.env.PORT || 3000;

    const app = await NestFactory.create(AppModule);
    app.use(helmet())
        .setGlobalPrefix('api/v1')
        .useGlobalPipes(new ValidationPipe())
        .useGlobalFilters(new HttpExceptionFilter())
        .enableCors(corsConfig);

    const config = new DocumentBuilder()
        .setTitle('Web Help Request API')
        .setDescription('The Web Help Request API description')
        .setVersion('1.0')
        .setLicense('MIT', 'https://github.com/PromoSncfToulouse2022-2023/webhelprequest-nest/blob/master/licence.MD')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    console.log('Server started at http://localhost:'+ port);
}
bootstrap();
