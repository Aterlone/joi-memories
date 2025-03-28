const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, db) {
    const authenticateUser = (email, password, done) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], function (err, results) {
            if (err) { return done(err); }
            if (results.length == 0) { return done(null, false, { message: 'Incorrect credentials.' }); }
            bcrypt.compare(password, results[0].hash, function (err, result) {
                if (err) { return done(err) };
                if (result) {
                    return done(null, results[0])
                }
                else {
                    return done(null, false, { message: 'Incorrect credentials.' })
                }
            });
        });
    }
    passport.use(new LocalStrategy({ usernameField: 'email' },
        authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], function (err, user) {
            if (err) { return done(err); }
            return done(null, user);
        });
    });
}

module.exports = initialize
