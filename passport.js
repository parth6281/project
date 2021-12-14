const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/users.model');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async (username, password, done) => {
        try {
            const user = await UserModel.getUserId(username, password)
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }

            if (!UserModel.validPassword(user, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        } catch (err) {
            console.log(err)
            return done(err);
        }
    }
));