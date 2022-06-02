import jwt from 'jsonwebtoken';

export const generate = (user: string | object | Buffer) => jwt.sign(user, process.env.APP_KEY);