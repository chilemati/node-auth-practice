const { db } = require('../models/User');
const { getDb } = require('../ultils/db');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

// functions 
function handleErrors(err) {
    // console.log(err.errors, err.code);
    const errors = { email: '', password: '' };
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    if (err.message.includes('E11000')) {
        // console.log('>>>>',err);
        errors['email'] = "This users already exists!";
    }

    // incorrect email

    if (err.message.includes('Email not correct')) {
        errors['email'] = 'I do not know this Email';
    }

    // incorrect password

    if (err.message.includes('Password not correct')) {
        errors['password'] = 'Incorrect Emaill or Password';
    }

    return errors;
}

const maxAge = 1 * 60 * 60 * 0.5;

function createToken(id) {
    return jwt.sign({id}, 'God can not LIE!', {expiresIn: maxAge })
}


module.exports.home_page = (req, res) => {
    res.render('home')
}
module.exports.blog_page = (req, res) => {
    res.render('blog')
}

module.exports.login_page = (req, res) => {
    const { email, password } = req.body;
    // res.json({ email, password });
    res.render('login');
}
module.exports.login_page_post = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.cookies.jwt);
     
    try {
        let user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
        
    } catch (err) {
        // console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
module.exports.signup_page = (req, res) => {
    const { email, password } = req.body;
    // res.json({ email, password });
    res.render('signup');
}

module.exports.signup_page_post = async(req, res) => {
    const { email, password } = req.body;
    // res.json({ email, password });
    // console.log(req.body.email);
    if (req.body.email !== undefined && req.body.password !== undefined) {
        
        try {
            let user = await User.create({ email, password });
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({ user: user._id });
            
        } catch (err) {
            const errors = handleErrors(err);
            // console.log('errors >>>', errors);
            res.status(400).json({ errors });
            
        }
    }
    else {
        res.status(402).send('empty request');
    }

    // res.render('signup');
}
module.exports.logout_page = (req, res) => {
    // res.redirect('/node/auth/api/');
    res.cookie('jwt', " ", { httpOnly: true, maxAge: 1 });
    res.redirect('http://localhost:3000/node/auth/api/');
}