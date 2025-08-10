import passport from "passport";
import { localStrategy } from "./strategies/passport.local";

passport.use(localStrategy);

export default passport;
