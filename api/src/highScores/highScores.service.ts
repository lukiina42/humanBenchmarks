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
    console.log(highScores)
    const score = await this.highScoresRepository.save({
        ...highScores,
        owner
    })
    return score.id
  }

  async getTop10HighScores(game: string){
    const result = await this.highScoresRepository.createQueryBuilder("highScore").leftJoinAndSelect("highScore.owner", "owner").addOrderBy(`highScore.${game}`, game === "aimTrainer" ? "ASC" : "DESC").limit(10).getMany()
    return result
  }
}