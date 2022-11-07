import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { HighScores } from './highScores/highScores.entity'
import { UsersModule } from './user/users.module';
import { HighScoresModule } from './highScores/highScores.module';
import { HighScoresController } from './highScores/highScores.controller';
import { HighScoresService } from './highScores/highScores.service';
import { UsersService } from './user/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 6000,
    username: 'apiserver',
    password: '2412',
    database: 'postgres',
    entities: [User, HighScores],
    synchronize: true,
  }),
  UsersModule,
  HighScoresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
