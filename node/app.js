const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');

const passportSetup = require('./config/passport-setup');

const app = express();
const http = require('http').Server(app);

const keys = require('./config/keys');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const guardRoutes = require('./routes/guards');
const userManagementRoute = require('./routes/user-management');
const logoutRoute = require('./routes/logout');

mongoose.connect(keys.mongodb.dbURI, keys.mongodb.options, () => {
    console.log('Connected to DB');
});

// app.use(cors());

const sessionStore = new mongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
});

app.use(expressSession({
    key: 'user_sid',
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        expires: 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "none"
        //secure: true,
        // sameSite: 'strict'
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.send('working');
});

app.use('/register', registerRoute);
app.use('/', loginRoute);
app.use('/', logoutRoute);
app.use('/', guardRoutes);
app.use('/admin', userManagementRoute);


mongoose.connection.on('error', (e) => {
    console.log(`-> Can't connect to DB \n ${e}`);
});


var port = process.env.port || 3000;

var server = http.listen(port, () => {
    console.log('app started at port ' + port);
});