const express = require('express');
const router = express.Router();
const UserController = require('./userController');
const userController = new UserController();
const passport = require('./auth');
const session = require('express-session');
const flash = require('connect-flash');

router.use(flash());
router.use(session({
    secret: 'YOUR-SECRET-STRING',
    resave: true,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect(301, '/user/notLogin');
    }
};

router.post("/register",userController.register);
router.get("/getUserByEmail",userController.getUserByEmail);
router.put("/editUser",userController.editUser);
router.post("/login",
    passport.authenticate('local', {
        successRedirect: '/user/userpage',
        failureRedirect: '/user/loginFail',
        failureFlash: true,
    })
);
router.post('/logout', (req, res) => {
    req.session.passport.user = undefined;
    res.redirect('/');
});
// login succeccful test page
router.get('/userpage', authMiddleware, (req, res) => {
    res.send('login successful');
});
// login fail in test page
router.get('/loginFail', (req, res) => {
    res.send('login fail');
});
// not logged in test page
router.get('/notLogin', (req, res) => {
    res.send('not logged in');
});

module.exports = router;