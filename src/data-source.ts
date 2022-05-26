import 'reflect-metadata';
import { join } from 'path';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import {User} from './entities/user.entity'
import {Post} from './entities/post.entity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [User, Post], // join(__dirname, './src/entities/*.entity{.ts,.js}')
  subscribers: [],
  migrations: [],
});