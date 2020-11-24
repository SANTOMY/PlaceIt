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
        res.redirect(301, '/user/fail');
    }
};

router.post("/register",userController.register);
router.get("/getUserByEmail",userController.getUserByEmail);
router.put("/editUser",userController.editUser);
router.post("/login",
    passport.authenticate('local', {
        successRedirect: '/user/userpage',
        failureRedirect: '/user/fail',
        failureFlash: true,
    })
);
router.post('/logout', (req, res) => {
    req.session.passport.user = undefined;
    res.redirect('/');
});
// login page test
router.get('/userpage', authMiddleware, (req, res) => {
    res.send('login successful');
});
// login fail test
router.get('/fail', (req, res) => {
    res.send('login fail');
});

module.exports = router;