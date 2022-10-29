import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { genSalt, hash, compare as comparePasswords} from "bcrypt";
import { HighScores } from 'src/highScores/highScores.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  private findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async loginUser(username: string, password: string): Promise<boolean> {
    const user = await this.findOneByUsername(username)
    if(!user) return false
    // check user password with hashed password stored in the database
    const validPassword = await comparePasswords(password, user.password);
    return validPassword
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(user: User): Promise<void> {
    // generate salt to hash password
    const salt = await genSalt(10);
    // now we set user password to hashed password
    user.password = await hash(user.password, salt);
    await this.usersRepository.insert(user)
  }

  async addHighScore(username: string, highScores: HighScores){
    const user = await this.findOneByUsername(username)
    user.highScores = highScores
    await this.usersRepository.save(user)
  }
}