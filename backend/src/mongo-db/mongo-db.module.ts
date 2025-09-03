import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV', 'development');

        let mongoUrl: string;

        switch (nodeEnv) {
          case 'production':
            mongoUrl =
              configService.get<string>('MONGO_URL') ??
              'mongodb://localhost:27017/EasyGenerator'; //placeholder value
            break;
          default:
            mongoUrl =
              configService.get<string>('LOCAL_MONGO_URL') ??
              'mongodb://localhost:27017/EasyGenerator';
        }

        return {
          uri: mongoUrl,
          connectionFactory: (connection: Connection) => {
            connection.on('connected', () => {
              console.log(`MongoDB connected to: ${mongoUrl}`);
            });

            connection.on('error', (error) => {
              console.error('MongoDB connection error:', error);
            });

            connection.on('disconnected', () => {
              console.log('MongoDB disconnected');
            });

            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDbModule {}
