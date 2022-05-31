import passport from "passport";
import LocalStrategy from "passport-local";
import * as crypto from "crypto";
import UserService from "../services/user.service";

passport.use(new LocalStrategy(
    { // or whatever you want to use
        usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
        passwordField: 'password'
    },
    function verify(username, password, cb: any) {
        console.log(username, password);
        const userService = new UserService();
        userService.getByEmail(username).then((resUser) => {
            return cb(null, resUser);
        }).catch((err) => {
            cb(err);
        });
        //return cb();
        /*db.get('SELECT * FROM users WHERE username = ?', [username], function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
                if (err) { return cb(err); }
                if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                return cb(null, user);
            });
        });*/
    }
));
export default passport;