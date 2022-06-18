import session from 'express-session'

var MySQLStore = require('express-mysql-session')(session);

export const cookieSessionConfig = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_PASSWORD,
  cookie: {
    maxAge: Number(process.env.SESSION_LIFETIME || 60) * 60 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false
}

const dbSessionOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_DATABASE
};

const sessionStore = new MySQLStore(dbSessionOptions);

export const dbSessionConfig = {
  key: process.env.SESSION_NAME,
	secret: process.env.SESSION_PASSWORD,
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}