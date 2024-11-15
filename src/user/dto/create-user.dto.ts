import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Полное имя пользователя' })
  full_name: string;

  @ApiProperty({ description: 'Роль пользователя' })
  role: string;

  @ApiProperty({ description: 'Эффективность пользователя', example: 100 })
  efficiency: number;
}
