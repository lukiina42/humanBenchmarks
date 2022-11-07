import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/users.service';
import { HighScoresController } from './highScores.controller';
import { HighScores } from './highScores.entity';
import { HighScoresService } from './highScores.service';

@Module({
  imports: [TypeOrmModule.forFeature([HighScores, User])],
  exports: [TypeOrmModule],
  providers: [HighScoresService, UsersService],
  controllers: [HighScoresController]
})
export class HighScoresModule {}