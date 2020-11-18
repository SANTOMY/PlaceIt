const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fileLabel = "auth.js"
const userSQL = require("../database/UserSQL")
const {info, debug, warning, error} = require("../winston");

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done) =>  {
        return userSQL.login(email, password).then((result)=>{
        if (result.success) {
            debug(fileLabel, "Successful Authentication " + email);
            return done(null, email); // ログイン成功
        } else {
            info(fileLabel, "Unsuccessful Authentication " + email + ": " + JSON.stringify(result));
            return done(null, false, { message: '認証情報と一致するレコードがありません。' });
        }
    }).catch((exception)=> {
        error(fileLabel, "Error in attempt to login " + email + ": " + exception);
        return done(null, false, { message: '認証情報と一致するレコードがありません。' });
    });
}));

// Session
passport.serializeUser((user, done) => {
    console.log('Serialize ...: ' + user);
    done(null, user);
});
passport.deserializeUser((user, done) => {
    console.log('Deserialize ...: ' + user);
    done(null, user);
});

module.exports = passport;