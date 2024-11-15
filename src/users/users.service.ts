import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  findByFilter(filter: Partial<User>): Promise<User[]> {
    return this.userRepository.find({ where: filter });
  }

  async update(id: number, updates: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updates);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id?: number): Promise<User | void> {
    if (id) {
      const user = await this.userRepository.findOne({ where: { id } });
      if (user) {
        await this.userRepository.remove(user);
        return user;
      }
    } else {
      await this.userRepository.clear();
    }
  }
}
