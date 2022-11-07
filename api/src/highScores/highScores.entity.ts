import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class HighScores {
    constructor(
        verbalMemory: number,
        numberMemory: number,
        aimTrainer: number
    ){
        this.verbalMemory = verbalMemory
        this.numberMemory = numberMemory
        this.aimTrainer = aimTrainer
    }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  verbalMemory: number

  @Column()
  numberMemory: number

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  aimTrainer: number

  @OneToOne(() => User, (user) => user.highScores)
  owner: User
}