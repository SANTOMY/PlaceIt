const express = require('express')
const fs = require('fs')
const https = require('https')
const dotenv = require('dotenv');
const env = dotenv.config();
const cors = require('cors')
const path = require('path')
const app = express()
let port = "5000"


const bodyParser = require('body-parser')
const userRoute = require('./route/userRoute');
const spotRoute = require('./route/spotRoute');
const reviewRoute = require('./route/reviewRoute');

const passport = require('./route/auth');
const session = require('express-session');
const flash = require('connect-flash');

app.use(flash());
app.use(session({
    secret: 'YOUR-SECRET-STRING',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect(301, '/');
    }
};

app.use(cors())

app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/spot',spotRoute)
app.use('/review',reviewRoute)



app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {return res.status(400).json({"success": false})};
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.status(200).json({"success": true});
        });
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    try {
        req.logout();
        return res.status(200).json({"success": true}); 
    } catch {
        return res.status(400).json({"success": false}); 
    }
});

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!');
})

app.get('/logintest', authMiddleware, (req, res) => {
    console.log(req);
    res.send('logged in');
})

https.createServer({
  key: fs.readFileSync(path.join(__dirname, '..','key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '..','cert.pem')),
  passphrase: 'SuperStrongPassword'
},app).listen(port, () =>{
  console.log(`Example app listening on port:${port}`)
})