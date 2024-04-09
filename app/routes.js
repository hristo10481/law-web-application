// app/routes.js

const profileController = require('../controllers/profileController');
const consultationController = require('../controllers/consultationController');
const checkRole = require('../middleware/checkRole');
const userController = require('../controllers/userController');
const subscriberController = require('../controllers/subscriberController');
const docsController = require('../controllers/docsController');
const Document = require('../models/docs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Конфигурация на multer със storage
// const upload = multer({ storage: storage });
const upload = multer({ storage: storage }).fields([{ name: 'document', maxCount: 1 }, { name: 'documentImage', maxCount: 1 }]);

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', async (req, res) => {
        try {
            const documents = await Document.findAll();
            res.render('index', { user: req.user, documents: documents });
        } catch (error) {
            console.error("Failed to get documents", error);
            res.status(500).send("An error occurred");
        }
    });
    
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));

    // Assuming you're using Passport for authentication
// app.post('/login',
// passport.authenticate('local', { failureRedirect: '/login' }),
// function(req, res) {
//   // Store user role in session
//   req.session.userRole = req.user.role;
//   res.redirect('/');
// });


// function isAdmin(req, res, next) {
//     if (req.session.userRole === 'admin') {
//         return next();
//     }
//     return res.status(403).send("Access Denied");
// }

// app.get('/admin/users', isAdmin, usersController.adminGetUsers);



app.get('/documents', docsController.getDocuments);

app.post('/upload', isAdmin, upload, docsController.uploadDocument);

// Маршрут за изтегляне на документ
app.get('/download/:id', docsController.downloadDocument);

// Маршрут за изтриване на документ
app.delete('/delete/:id', isAdmin,docsController.deleteDocument);






app.post('/subscribe', subscriberController.subscribe);



// Получаване на всички потребители
app.get('/admin/dashboard', isLoggedIn, isAdmin, (req, res) => {
    res.render('dashboard', {
        user: req.user
    });
});
app.get('/admin/users', checkRole('admin'), userController.getAllUsers);
app.put('/users/:id', checkRole('admin'), userController.updateUser);
app.delete('/users/:id', checkRole('admin'), userController.deleteUser);



    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)


    app.get('/profile',profileController.getProfile, isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
        console.log(req.body);
		
    });


    app.post('/profile', isLoggedIn, profileController.updateOrCreateProfile);

    



    app.post('/send-consultation', consultationController.sendConsultation);
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        // res.redirect('/login');
        res.redirect('/');
    }
};




// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    // Optionally, redirect to a different page or send an error
    res.status(403).send('Access Denied: You do not have permission to access this page.');
}

// Route for the admin dashboard
