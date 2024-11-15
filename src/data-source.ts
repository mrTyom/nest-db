import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './user/user.entity';

// Загружаем переменные из .env
config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User], // Ваши сущности
  synchronize: true, // Убедитесь, что false, если не хотите автоматического изменения схемы
  logging: ['query', 'error'], // Логи запросов и ошибок
});
