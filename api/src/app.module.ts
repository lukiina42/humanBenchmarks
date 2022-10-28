import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 6000,
    username: 'apiserver',
    password: '2412',
    database: 'postgres',
    entities: [User],
    synchronize: true,
  }),
  UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
