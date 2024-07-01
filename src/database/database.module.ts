import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DB_CONNECTION_NAME = 'cafeRomashka';
@Module({})
export class DatabaseModule {
    static register() {
        return {
            module: DatabaseModule,
            imports: [
                ConfigModule.forRoot(),
                MongooseModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) => ({
                        uri: configService.get('MONGO_CONNECTION_STRING'),
                    }),
                    inject: [ConfigService],
                }),
            ],
        };
    }
}
