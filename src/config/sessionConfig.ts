export const sessionConfig = {
    name: "session",
    secret: "somehardkey1", // Secret key,
    cookie: {
        maxAge: Number(process.env.SESSION_LIFETIME || 60) * 60 * 1000,
        secure: false,
        httpOnly: false,
      },
    resave: false,
    saveUninitialized: false
}