const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enteer a valid email']
    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
        minlength: [6, 'Mininum password length is 6 characters'],
    }
}, { timestamps: true });

// mongoose hooks
// fire a fuction after db save
// userSchema.post('save', (doc, next) => {
//     console.log('a new user created');
//     console.log(doc);
//     next();
// });

// fire a fucntion before db save

userSchema.pre('save', async function (next) { // we don't get doc here, because document has not be saved to db
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// login code

userSchema.statics.login = async function (email, password) {
    let user = await this.findOne({ email });
    if (user) {
        let auth = await bcrypt.compare(password, user.password);
        if (auth) {

            return user;
            
        }
        throw Error('Password not correct');
        
    }
    throw Error('Email not correct');
    
}

const user = mongoose.model('user', userSchema);

module.exports = user;