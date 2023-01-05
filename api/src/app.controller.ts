import { Controller, Request, Post,  UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './user/users.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    const token = await this.authService.login(req.user)
    const highScores = await this.userService.getHighScore(req.user.id)
    return {
      token,
      id: req.user.id,
      highScores
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/getHello')
  getHello(){
    return "Hello World!"
  }
}
