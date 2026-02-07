const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    phone: {
        type: Number, 
        required: true
    },
    occupation: { 
        type: String, 
        enum: ['Student', 'Working Professional'] 
    },
    password: {
        type: String, 
        required: true
    },
    cpassword: {
        type: String, 
        required: true
    },
    tokens: [
        {
            token: {
                type: String, 
                required: true
            }
        }
    ]
})


userSchema.pre('save', async function (next) {
    console.log('in save');
    if(this.isModified('password')) {
        console.log('in modified');
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
        console.log(this.password);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let tokenvar = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token:tokenvar });
        await this.save();
        return tokenvar;
    }catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;