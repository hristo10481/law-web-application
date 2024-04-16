// config/passport.js


var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function (passport) {


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function (err, rows) {
            done(err, rows[0]);
        });
    });


    passport.use(
        'local-signup',
        new LocalStrategy({

            usernameField: 'username',
            emailField: "email",
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, username, password, done) {
                var email = req.body.email;


                if (!email) {
                    return done(null, false, req.flash('signupMessage', 'Попълнете валиден имейл'));
                }
                if (!username) {
                    return done(null, false, req.flash('signupMessage', 'Попълнте всички полета'));
                }
                if (!password) {
                    return done(null, false, req.flash('signupMessage', 'Попълнте всички полета'));
                }





                connection.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        if (rows[0].email === email) {
                            return done(null, false, req.flash('signupMessage', 'Имейлът е вече зает.'));
                        } else if (rows[0].username === username) {
                            return done(null, false, req.flash('signupMessage', 'Потребителското име е вече заето.'));
                        }
                    } else {

                        var newUserMysql = {
                            username: username,
                            email: email,
                            password: bcrypt.hashSync(password, null, null)
                        };

                        var insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

                        connection.query(insertQuery, [newUserMysql.username, newUserMysql.email, newUserMysql.password], function (err, rows) {
                            if (err)
                                return done(err);
                            newUserMysql.id = rows.insertId;

                            var insertProfileQuery = "INSERT INTO profiles (user_id, email) VALUES (?, ?)";
                            connection.query(insertProfileQuery, [newUserMysql.id, req.body.email], function (err, rows) {
                                if (err)
                                    console.log(err);
                            });




                            return done(null, newUserMysql);
                        });
                    }
                });
            })
    );



    passport.use(
        'local-login',
        new LocalStrategy({

            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, username, password, done) {
                connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'Не е намерен такъв профил.'));
                    }

                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Грешна парола.'));

                    return done(null, rows[0]);
                });
            })
    );
};
