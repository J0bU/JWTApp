'use strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// Initializations
const app = express();
require('./config/config');


// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');


// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// Cookies
// app.get('/set-cookies', (req, res) => {

//     // Old version
//     // res.setHeader('Set-Cookie', 'newUser=true');
    
//     // New version
//     //res.cookie('nameCookie', 'valueCookie');
//     // Properties: 
//     // 1. 'secure: true' https
//     // 2. httpOnly: cannot read document propertie
    
//     res.cookie('newUser', false);
//     res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});

//     res.json({ok:true});
// });

// app.get('/read-cookies', (req, res) => {

//     const cookies = req.cookies;
//     console.log(cookies);
//     res.json(cookies);
// });

// Static Files
app.use(express.static(path.resolve(__dirname, './public')));

module.exports = app;