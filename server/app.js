const express = require ('express');
const session = require ('express-session');
const cookie = require ('cookie-parser');

const ejs= require ('ejs');
const multer = require('multer');
const path = require ('path');
const async = require ('async');
const nodmailer = require ('nodemailer');
const crypto = require ('crypto');
const expressValidator = require ('express-validator');
const  sweetalert = require('sweetalert2');
const app = express();



const bodyParser = require ('body-parser');

const  login = require ('./controllers/login');
const  home = require ('./controllers/home');
const  signup = require ('./controllers/signup');
// const add_doc = require('./controllers/commented/addUser');
const  users = require ('./controllers/users');
const db = require ('./models/db_controller'); 
const reset = require('./controllers/reset_controller');
const set = require('./controllers/set_controller');
const employee = require ('./controllers/donors.js'); 
const logout = require ('./controllers/logout'); 
const verify = require ('./controllers/verify');
const userRequests = require ('./controllers/userRequests');   
// const landing = require ('./controllers/commented/landing');
// const complain = require ('./controllers/commented/complain');
// const inbox = require ('./controllers/commented/inbox');
// const appointment = require ('./controllers/commented/appointment');

// const receipt = require ('./controllers/commented/receipt');
// const chat = require ('./controllers/commented/chat');




app.set('view engine ', 'ejs');   
 



app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookie());
//app.use(expressValidator());


const server =app.listen(3000 , function(){

    console.log('server started'); 
});
 
app.use('/login' ,login);
app.use('/' , home); 
app.use('/signup' , signup);
app.use('/users', users);
app.use('/resetpassword' ,reset);
app.use('/setpassword',set);  
app.use('/donors',employee);  
app.use ('/logout',logout); 
app.use ('/verify', verify);   
app.use ('/userrequests',userRequests);   
// app.use ('/',landing);    
// app.use ('/complain',complain);
// app.use ('/inbox',inbox);
// app.use ('/appointment',appointment);
// app.use('/receipt',receipt);

// app.use('/doctors/add_doctor',add_doc);