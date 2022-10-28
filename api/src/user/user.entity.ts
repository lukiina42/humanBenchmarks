import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    constructor(
        username: string,
        password: string
    ){
        this.username = username
        this.password = password
    }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;
}