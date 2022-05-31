import { User } from "entities/user.entity";
import passport from "passport";

passport.serializeUser(function (user: User, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.email });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

export default passport;