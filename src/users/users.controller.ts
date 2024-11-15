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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан.' })
  async create(@Body() userData: CreateUserDto) {
    try {
      const user = await this.userService.create(userData);
      return { success: true, result: { id: user.id } };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }

  @Get('/get/:id?')
  @ApiOperation({ summary: 'Получить пользователя или список пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь или список пользователей.',
  })
  async get(
    @Param('id') id?: number,
    @Query() filters?: Partial<CreateUserDto>,
  ) {
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
  @ApiOperation({ summary: 'Обновить данные пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно обновлен.' })
  async update(@Param('id') id: number, @Body() updates: UpdateUserDto) {
    try {
      const user = await this.userService.update(Number(id), updates);
      return { success: true, result: user };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }

  @Delete('/delete/:id?')
  @ApiOperation({ summary: 'Удалить пользователя или всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь(и) успешно удален(ы).',
  })
  async delete(@Param('id') id?: number) {
    try {
      const user = await this.userService.delete(id ? Number(id) : undefined);
      return id ? { success: true, result: user } : { success: true };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }
}
