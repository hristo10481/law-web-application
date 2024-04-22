// server.js

var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8080;
const path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');



app.use(express.static(path.join(__dirname, 'public')));

app.use("/uploads",express.static(path.join(__dirname, 'uploads')));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());



require('./config/passport')(passport); 

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes 
require('./routes/routes.js')(app, passport); 

// launch
app.listen(port);
console.log('The magic happens on port ' + port);
