import { Controller, Get, Post, Param, Body, HttpCode, BadRequestException, Patch, NotFoundException } from '@nestjs/common';
import { HighScores } from '../highScores/highScores.entity';
import { User } from '../user/user.entity';
import { UsersService } from '../user/users.service';
import { HighScoresService } from './highScores.service';

@Controller("/highScores")
export class HighScoresController{
    constructor(private readonly userService: UsersService, private readonly highScoresService: HighScoresService) {}

    @Patch()
    @HttpCode(204)
    async addHighScore(
        @Body('userId') userId: number,
        @Body('highScores') highScores: HighScores
    ){
        const owner = await this.userService.findOneById(userId)
        if(!owner) throw new NotFoundException(`User with id ${userId} was not found`)
        await this.highScoresService.addHighScore(owner, highScores)
    }
}