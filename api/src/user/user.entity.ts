import { HighScores } from '../highScores/highScores.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
    constructor(
        email:string,
        username: string,
        password: string
    ){
        this.email = email
        this.username = username
        this.password = password
    }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @OneToOne(() => HighScores, (highScores) => highScores.owner)
  @JoinColumn()
  highScores: HighScores
}