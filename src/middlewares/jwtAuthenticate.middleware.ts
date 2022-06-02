import passport from "passport";

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

export default jwtAuthenticate;