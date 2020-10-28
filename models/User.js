'use strict';

const {Schema, model} = require('mongoose');
// Validate email and other things module.
const { isEmail } = require('validator');
// Bcrypt hashing
const bcrypt = require('bcrypt');

// User model
const userSchema = new Schema({
    email: {
        type: String,
        // Custom validation
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email ']
    },
    password: {
        type: String,
        // Custom validation
        required: [true, 'Please enter a password'],
        // Custom validation
        minlength: [6,'Minimum password length is six characters'] 
    }
});

//====== Hooks =====
//1. Fire a function after doc and saved to db.
// userSchema.post('save', function(doc, next)  {
//     console.log('New user was created & saved', doc);
//     next();
// });

//1. Fire a function before doc and saved to db.
// don't exists doc attribute because after to create and save 
// there isn't nothing. 
userSchema.pre('save',  async function(next) {
// 1. Generate salt
const salt = await bcrypt.genSalt();
// 2. Generate hash
this.password = await bcrypt.hash(this.password, salt);
//    console.log('User about to be created and saved', this);
    next();
});

// Static method to login user
userSchema.statics.login = async function(email, password) {

    const user = await User.findOne({email: email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        // auth: true or false
        if(auth){
            return user;
        }  
        throw Error('Incorrect password');
    }
    throw Error('The email is incorrect');
    // These errors will be lunch in handleErrors function.
}


const User = model('user', userSchema);
module.exports = User;