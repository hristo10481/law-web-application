// app/routes.js

const profileController = require('../controllers/profileController');
const consultationController = require('../controllers/consultationController');
const checkRole = require('../middleware/checkRole');
const userController = require('../controllers/userController');
const subscriberController = require('../controllers/subscriberController');
const lawyersController = require('../controllers/lawyersController');
const consultationRequestController = require('../controllers/consultationRequestController');

const docsController = require('../controllers/docsController');
const Document = require('../models/docs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).fields([{ name: 'document', maxCount: 1 }, { name: 'documentImage', maxCount: 1 }]);

module.exports = function (app, passport) {

    app.get('/', async (req, res) => {
        try {
            const documents = await Document.findAll();
            res.render('index', { user: req.user, documents: documents });
        } catch (error) {
            console.error("Failed to get documents", error);
            res.status(500).send("An error occurred");
        }
    });


    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));




    app.get('/documents', docsController.getDocuments);
    app.post('/upload', isAdmin, upload, docsController.uploadDocument);
    app.get('/download/:id', docsController.downloadDocument);
    app.delete('/delete/:id', isAdmin, docsController.deleteDocument);






    app.post('/subscribe', subscriberController.subscribe);



    app.get('/admin/lawyers', isAdmin, lawyersController.getAllLawyers);
    app.post('/admin/lawyers', isAdmin, lawyersController.createLawyer);
    app.put('/admin/lawyers/:id', isAdmin, lawyersController.updateLawyer);
    app.delete('/admin/lawyers/:id', isAdmin, lawyersController.deleteLawyer);




    app.post('/consultations', consultationRequestController.createConsultation);
    app.get('/consultations/lawyer/:lawyerId', consultationRequestController.getConsultationsForLawyer);
    app.put('/consultations/:consultationId', consultationRequestController.updateConsultation);
    app.get('/admin/consultations', consultationRequestController.getAllConsultations);
    app.put('/consultations/:consultationId/approve', consultationRequestController.approveConsultation);
    app.put('/consultations/:consultationId/decline', consultationRequestController.declineConsultation);
    app.delete('/admin/consultations/:consultationId', consultationRequestController.deleteConsultation);


    app.get('/admin/dashboard', isLoggedIn, isAdmin, (req, res) => {
        res.render('dashboard', {
            user: req.user
        });
    });
    app.get('/admin/users', checkRole('admin'), userController.getAllUsers);
    app.put('/users/:id', checkRole('admin'), userController.updateUser);
    app.delete('/users/:id', checkRole('admin'), userController.deleteUser);




    app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));




    app.get('/profile', profileController.getProfile, isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
        console.log(req.body);

    });



    app.get('/api/profile', isLoggedIn, async (req, res) => {
        try {
            const userProfile = await profileController.getProfileData(req.user.id);
            res.json(userProfile);
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).send('Internal Server Error');
        }
    });



    app.post('/profile', isLoggedIn, profileController.updateOrCreateProfile);


    app.post('/send-consultation', consultationController.sendConsultation);


    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
};


function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }

    res.status(403).send('Access Denied: You do not have permission to access this page.');
}

