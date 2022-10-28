import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller("/users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll()
  }

  @Post()
  createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) 
    {
      this.userService.add(new User(username, password))
  }
}
