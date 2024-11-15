import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() userData: Partial<User>) {
    try {
      const user = await this.userService.create(userData);
      return { success: true, result: { id: user.id } };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }

  @Get('/get/:id?')
  async get(@Param('id') id?: number, @Query() filters?: Partial<User>) {
    try {
      if (id) {
        const user = await this.userService.findById(Number(id));
        return { success: true, result: { users: user ? [user] : [] } };
      }
      const users = await this.userService.findByFilter(filters || {});
      return { success: true, result: { users } };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() updates: Partial<User>) {
    try {
      const user = await this.userService.update(Number(id), updates);
      return { success: true, result: user };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }

  @Delete('/delete/:id?')
  async delete(@Param('id') id?: number) {
    try {
      const user = await this.userService.delete(id ? Number(id) : undefined);
      return id ? { success: true, result: user } : { success: true };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }
}
