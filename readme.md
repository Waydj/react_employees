# Приложение для Управления Сотрудниками

Это приложение предназначено для управления сотрудниками в организации. Оно обладает рядом функций, включая регистрацию, авторизацию, создание, просмотр, редактирование и удаление сотрудников. Вот более подробное описание приложения:

## Основные функции

1. **Регистрация и Авторизация**
   - Пользователи могут зарегистрироваться в системе, предоставив свои учетные данные.
   - После успешной регистрации пользователи могут войти в систему, используя свой логин и пароль.

2. **Управление Сотрудниками**
   - Создание сотрудников: Администраторы могут добавлять новых сотрудников, указывая их данные, такие как имя, фамилия, возраст и контактная информация.
   - Просмотр сотрудников: Пользователи могут просматривать список всех сотрудников, доступных в системе.
   - Редактирование сотрудников: Администраторы имеют возможность изменять информацию о сотрудниках.
   - Удаление сотрудников: Администраторы могут удалять сотрудников из системы, если это необходимо.

## Технические детали

- Приложение создано с использованием Express application generator для серверной части.
- В приложении есть два основных маршрута:
  - `/users` - для управления пользователями (регистрация и авторизация)
  - `/employees` - для управления данными о сотрудниках
- ORM (Object-Relational Mapping) для работы с базой данных - Prisma. В качестве базы данных используется SQLite.
- Для аутентификации используется JSON Web Tokens (JWT).
- Клиентская часть приложения разработана с использованием следующих технологий:
  - React - для построения пользовательского интерфейса.
  - Redux Toolkit - для управления состоянием приложения.
  - RTK Query - для управления данными с сервера.
  - TypeScript - для статической типизации.
- Для дизайна пользовательского интерфейса используется библиотека Ant Design.

## Запуск Приложения

Для запуска приложения выполните следующие шаги:

1. Склонируйте репозиторий на свой компьютер.

2. Создайте файл `.env` в корневой папке приложения и установите следующие переменные окружения:

   ```
   JWT_SECRET=<ваш_секретный_ключ>
   PORT=<порт_приложения>
   DATABASE_URL="file:./dev.db"
   ```

3. Установите зависимости для серверной и клиентской части приложения.

4. Запустите миграции для базы данных с помощью команды:

   ```
   npx prisma migrate dev --name init
   ```

5. Запустите приложение с помощью команды:

   ```
   npm run dev
   ```

   Это одновременно запустит сервер и клиентскую часть с использованием пакета `concurrently`.

Теперь ваше приложение для управления сотрудниками должно быть доступно для использования. Вы можете войти в систему, создавать и управлять сотрудниками. Удачной работы с приложением!