// Define port
process.env.PORT = process.env.PORT || 3000;

// Define environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Define database
let urlDatabase;

if(process.env.NODE_ENV = 'dev'){
    // urlDatabase = 'mongodb://localhost/jwt';
    // This database will be removed. 
    urlDatabase = 'mongodb+srv://node_auth:1234@cluster0.5oocy.mongodb.net/node-auth';
}else{
    urlDatabase = proces.env.MONGO_URI;
}

process.env.URLDB = urlDatabase;
