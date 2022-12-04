import { Controller, Request, Body, HttpCode, UseGuards, Patch, NotFoundException } from '@nestjs/common';
import { HighScores } from '../highScores/highScores.entity';
import { User } from '../user/user.entity';
import { UsersService } from '../user/users.service';
import { HighScoresService } from './highScores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("/highScores")
export class HighScoresController{
    constructor(private readonly userService: UsersService, private readonly highScoresService: HighScoresService) {}

    @UseGuards(JwtAuthGuard)
    @Patch()
    @HttpCode(204)
    async addHighScore(
        @Request() req,
        @Body('highScores') highScores: HighScores
    ){
        console.log(highScores)
        const owner = await this.userService.findOneById(req.user.userId)
        if(!owner) throw new NotFoundException(`User with id ${req.user.userId} was not found`)
        await this.highScoresService.addHighScore(owner, highScores)
    }
}