require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT  || 3001;

app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json())
.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))

//This is the basic express session initialization
.use(passport.initialize())
.use(passport.session())
//This is the basic passport session initialization
.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
})
.use(cors({methods:['GET', 'POST', 'DELETE', 'UPDATE', 'PUT','PATCH']}))
.use(cors({origin: '*'}))
.use('/', require("./routes/index.js"));




passport.use(new GitHubStrategy ({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
    //User.findOrCreate({githubId: profile.id}, function(err,user){
       return done(null,profile);
    //})
}
));

passport.serializeUser((user,done) =>{
    done(null,user);
});

passport.deserializeUser((user,done) =>{
    done(null,user);
})

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out');
  });

app.get('/github/callback', passport.authenticate('github',{
    failureRedirect: '/api-docs', session: false}),
    (req, res)=>{
        req.session.user = req.user;
        res.redirect('/');
    });

    mongodb.initDb((err) => {
    if (err){
        console.log(err);

} 
else{
    app.listen(port, ()=>console.log(`Database is listening and node is running on ${port}`));
}});