import passport from "passport";
import LocalStrategy from "passport-local";
import * as crypto from "crypto";
import UserService from "../services/user.service";
import { compareToHash } from "./bcryptHashGenerator";

passport.use(new LocalStrategy(
    { // or whatever you want to use
        usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
        passwordField: 'password'
    },
    function verify(username: string, password: string, cb: any) {
        console.log(username, password);
        const userService = new UserService();
        userService.getByEmail(username).then((resUser) => {

            if(!resUser) {
                throw new Error('Incorrect username or password.');
            }

            const isEqual = compareToHash(password, resUser.password)

            if(isEqual) {
                return cb(null, resUser);
            }

            throw new Error('Incorrect username or password.');

        }).catch((err) => {
            cb(err);
        });
    }
));
export default passport;