# Dockerfile
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Установка переменных окружения
ENV NODE_ENV=production

# Запуск сборки (если используется TypeScript)
RUN npm run build

# Установка порта
EXPOSE 3000

# Команда запуска
CMD ["node", "dist/main"]
