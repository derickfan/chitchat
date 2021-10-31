import bcrypt from "bcrypt";
import passport from "passport";
import * as passportLocal from "passport-local";
import User from "../models/User";

const LocalStrategy = passportLocal.Strategy;

const comparePassword = async (password: string, hashedPassword: string) => {
	return bcrypt.compareSync(password, hashedPassword);
};

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		async (username, password, done) => {
			try {
				const user = await User.findOne({ where: { username } });
				if (!user) {
					return done("User does not exist", false);
				}
				const match = await comparePassword(
					password,
					user.hashedPassword
				);
				return match
					? done(null, user, { message: "Successfully logged in" })
					: done("Incorrect password", false);
			} catch (err) {
				return err;
			}
		}
	)
);

passport.serializeUser((user: any, done) => {
	return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
	const user = await User.findByPk(id);
	if (!user) {
		return done(null, false);
	} else {
		return done(null, user);
	}
});

export default passport;
