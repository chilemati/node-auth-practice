const express = require('express');
const app = express();
// const { main, getDb } = require('./ultils/db')
const router = require('./router/authRouter');

const { conn } = require('./ultils/db');
const cookieParser = require('cookie-parser');


// middleware
app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/node/auth/api', router);


app.set('view engine', 'ejs');

// cookie practive

// app.get('/cookies', (req, res) => {
//     // res.setHeader('set-cookie', 'newUser=true');
//     res.cookie('newUser', false, {maxAge: 1000 * 60 * 60 * 24});
//     res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 2, secure: true, httpOnly: true});
//     res.send('you got the cookies');
// })

// app.get('/read-cookies', (req, res) => {
//     let cookie = req.cookies;

//     res.json(cookie);
// })

// connect db

let db;

conn(() => {
    app.listen(3000, () => {
        console.log('listening to request on port 3000!');
    });
    // db = getDb();
});


