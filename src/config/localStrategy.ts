import passport from "passport";
import LocalStrategy from "passport-local";
import * as crypto from "crypto";
import UserService from "../services/user.service";
import { compareToHash } from "../utils/bcryptHashGenerator";
import jwt from 'passport-jwt'

const userService = new UserService();

passport.use(new LocalStrategy(
    { // or whatever you want to use
        usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
        passwordField: 'password'
    },
    function verify(username: string, password: string, cb: any) {
        console.log(username, password);
        userService.getByEmail(username).then((resUser) => {

            if (!resUser) {
                throw new Error('Incorrect username or password.');
            }

            const isEqual = compareToHash(password, resUser.password)

            if (isEqual) {
                return cb(null, resUser);
            }
            console.log("-????");
            throw new Error('Incorrect username or password.');

        }).catch((err) => {
            cb(err);
        });
    }
));

const options = {
    jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_KEY,
};

passport.use(new jwt.Strategy(options, (jwtPayload, cb) => {
    userService.getByEmail(jwtPayload)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}));

export default passport;