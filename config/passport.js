// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // Override the default username and password fields with email and password
            usernameField: 'username',
            emailField: "email",
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            var email = req.body.email;
    
            // Check if email is provided
            if (!email) {
                return done(null, false, req.flash('signupMessage', 'Попълнете валиден имейл'));
            }
            if (!username) {
                return done(null, false, req.flash('signupMessage', 'Попълнте всички полета'));
            }
            if (!password) {
                return done(null, false, req.flash('signupMessage', 'Попълнте всички полета'));
            }
            

           
    
            // find a user whose email or username is the same as the form's email or username
            connection.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    if (rows[0].email === email) {
                        return done(null, false, req.flash('signupMessage', 'Имейлът е вече зает.'));
                    } else if (rows[0].username === username) {
                        return done(null, false, req.flash('signupMessage', 'Потребителското име е вече заето.'));
                    }
                } else {
                    // if there is no user with that email or username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        email: email,
                        password: bcrypt.hashSync(password, null, null)
                    };
    
                    var insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    
                    connection.query(insertQuery, [newUserMysql.username, newUserMysql.email, newUserMysql.password], function(err, rows) {
                        if (err)
                            return done(err); // Return error to stop processing
                        newUserMysql.id = rows.insertId;
    
                        var insertProfileQuery = "INSERT INTO profiles (user_id, email) VALUES (?, ?)";
                        connection.query(insertProfileQuery, [newUserMysql.id, req.body.email], function(err, rows) {
                            if (err)
                                console.log(err); // You might want to handle this error or log it
                        });




                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );
    
    
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Не е намерен такъв профил.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return  done(null, false, req.flash('loginMessage', 'Oops! Грешна парола.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
