import 'reflect-metadata';
import { join } from 'path';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import {User} from '../entities/user.entity'
import {Post} from '../entities/post.entity'
import { Like } from '../entities/like.entity';
import {passwordAdded1653747646999} from '../migration/1653747646999-password-added'

console.log(join(__dirname, 'migration/*.ts'));

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [User, Post, Like], // join(__dirname, './src/entities/*.entity{.ts,.js}')
  subscribers: [],
  migrations: [passwordAdded1653747646999], // join(__dirname, 'migration/*.ts')
});
