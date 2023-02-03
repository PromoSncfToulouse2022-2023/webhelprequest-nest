import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './errors/http-exception.filter';
import helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';

async function bootstrap() 
{
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.setGlobalPrefix('api/v1');
    const config = new DocumentBuilder()
        .setTitle('Web Help Request API')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('WebHelpRequest')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter())
    ConfigModule.forRoot()
    await app.listen(process.env.PORT || 3000);
    console.log('Server started at http://localhost:3000');
}
bootstrap();
