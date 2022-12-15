import { Controller, Request, Body, HttpCode, UseGuards, Patch, NotFoundException, Get, Param } from '@nestjs/common';
import { HighScores } from '../highScores/highScores.entity';
import { UsersService } from '../user/users.service';
import { HighScoresService } from './highScores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("/highScores")
export class HighScoresController{
    constructor(private readonly userService: UsersService, private readonly highScoresService: HighScoresService) {}

    @UseGuards(JwtAuthGuard)
    @Patch()
    @HttpCode(201)
    async addHighScore(
        @Request() req,
        @Body('highScores') highScores: HighScores
    ){
        const owner = await this.userService.findOneById(req.user.userId)
        if(!owner) throw new NotFoundException(`User with id ${req.user.userId} was not found`)
        const scoreId = await this.highScoresService.addHighScore(owner, highScores)
        return {highScoreId: scoreId}
    }

    @Get(":game")
    @HttpCode(200)
    async getTop10Scores(
        @Param("game") game: string
    ){
        const scores = await this.highScoresService.getTop10HighScores(game)
        return scores
    }
}