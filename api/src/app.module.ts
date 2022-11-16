import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { HighScores } from './highScores/highScores.entity'
import { UsersModule } from './user/users.module';
import { HighScoresModule } from './highScores/highScores.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities:  [User, HighScores],
        synchronize: true,
      }),
      inject: [ConfigService],
  }),
  UsersModule,
  HighScoresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
