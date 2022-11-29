import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { genSalt, hash, compare as comparePasswords} from "bcrypt";
import { HighScores } from 'src/highScores/highScores.entity';

@Injectable()
export class HighScoresService {
  constructor(
    @InjectRepository(HighScores)
    private highScoresRepository: Repository<HighScores>,
  ) {}

  async addHighScore(owner: User, highScores: HighScores){
    await this.highScoresRepository.save({
        ...highScores,
        owner
    })
  }
}