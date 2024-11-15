import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  role: string;

  @Column('int')
  efficiency: number;
}