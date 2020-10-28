// This middleware file allows to protect routes in the site.
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware function
const requireAuth = (req, res, next) => {

    // Grab token into cookies
    const token = req.cookies.jwt;


    // check json web token exists & is verified or valid
    if(token) {
        // 1. Token, 2. secret word, 3. (error, decodedToken)
        jwt.verify( token, 'learning jwt', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } else { 
                console.log( decodedToken );
                next();
            }
        });
    } else {
        // if token doesn't exist.
        res.redirect('/login');
    }
};

// Check current user

const checkUser =  ( req, res, next ) => {
    const token = req.cookies.jwt;

    // Token exists
    if( token ) {
        // 1. Token, 2. secret word, 3. (error, decodedToken)
        jwt.verify( token, 'learning jwt', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else { 
                console.log( decodedToken );
                let user = await User.findById( decodedToken.id );
                res.locals.user = user;
                next();
            }
        });
    } else { 
        res.locals.user = null;
        next();

    }
};

module.exports = { requireAuth, checkUser };