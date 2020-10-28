'use strict';

const mongoose = require('mongoose');
require('./config/config');

mongoose.connect(process.env.URLDB, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( (db) => {
    console.log(`Database is connected`);
})
.catch( (error) => { 
    console.log(error);
});
