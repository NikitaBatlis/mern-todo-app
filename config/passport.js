const passport = require('passport');
const GoogleStrat = require('passport-google-oauth20');
const keys = require('./keys');//We have created keys.js to store our sensitive information including the clientSecret for our app. See keys.js
const User = require('../models/user.model.js');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
}); 

passport.use(new GoogleStrat({
        //options for stratergy
        callbackURL: 'http://localhost:3001/login/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, 

    (accessToken, refreshToken, profile, done) => {
        console.log('Passport callback function fired');
        console.log(profile);
        User.findOne({ googleID: profile.id }).then((currentUser) => {
            if (currentUser) {
                //have this user in our db
                console.log('new User ' + currentUser);
                done(null, currentUser);
            } else {
                //user not saved in DB so save  
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log('new User ' + newUser);
                    done(null, newUser);
                });
            }
        });

    }));

