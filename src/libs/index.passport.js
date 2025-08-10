import passport from "passport";
import { localStrategy } from "./strategies/passport.local.js";

passport.use(localStrategy);

export default passport;
