// Define port
process.env.PORT = process.env.PORT || 3000;

// Define environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Define database
let urlDatabase;

if(process.env.NODE_ENV = 'dev'){
    // urlDatabase = 'mongodb://localhost/jwt';
    // This database will be removed. 
    urlDatabase = 'here your database link';
}else{
    urlDatabase = proces.env.MONGO_URI;
}

process.env.URLDB = urlDatabase;
