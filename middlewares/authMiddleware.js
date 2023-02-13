const jwt = require('jsonwebtoken');
const User = require('../models/User');


const requireAuth = (req, res, next) => {
    const isJwt = req.cookies.jwt;
    if (isJwt) {
        const isValid = jwt.verify(isJwt, 'God can not LIE!', (err, decodedToken) => {
            if (err) {
                // console.log(err);
                 res.redirect('http://localhost:3000/node/auth/api/login');
            } else {
                // console.log(decodedToken,'>>>');
                next();
            }

        });
        
    } else {
        res.redirect('http://localhost:3000/node/auth/api/login');
    }
    

}

const checkUser = (req, res, next) => {
    const isJwt = req.cookies.jwt;
    if (isJwt) {
        const isValid = jwt.verify(isJwt, 'God can not LIE!', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }

        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser
}