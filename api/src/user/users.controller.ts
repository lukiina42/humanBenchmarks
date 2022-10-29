import { Controller, Get, Post, Param, Body, HttpCode, BadRequestException, Patch } from '@nestjs/common';
import { HighScores } from '../highScores/highScores.entity';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller("/users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll()
  }

  @Post('/login')
  @HttpCode(200)
  async loginUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ){
    if (!password || !username) {
      throw new BadRequestException("All fields must be filled")
    }
    const loginAttempt = await this.userService.loginUser(username, password)
    if(loginAttempt){
      return true
    }
      else { 
        throw new BadRequestException("Username and password don't match!")
    }
  }

  @Post('/signup')
  @HttpCode(204)
  async createUser(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) 
    {
      if (!email || !password || !username) {
        throw new BadRequestException("All fields must be filled")
      }
      await this.userService.createUser(new User(email, username, password))
  }

  @Patch('/score')
  @HttpCode(204)
  async addHighScore(
    @Body('username') username: string,
    @Body('highScores') highScores: HighScores
  ){
    await this.userService.addHighScore(username, highScores)
  }
}
