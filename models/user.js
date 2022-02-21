const mongoose = require('mongoose')
const { v1: uuidv1 } = require('uuid')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,  // removes space left in the name
        required: true
    },
    email: {
        type: String,
        trim:true,
        required: true
    }, 
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    }, 
    updated: Date
})

userSchema.virtual('password') 
.set(function(password) {
    //takes the password and hashes it 
    this._password = password 
    // make a timestamp with uuid
    this.salt = uuidv1()
    //encrypt the password 
    this.hashed_password = this.encryptPassword(password)
}) 
.get(function() {
    return this._password
})

// add methods to schema 
// also used in controllers/auth.js 
userSchema.methods = {
    authenticate: function(plainText) {
        // should match hashed password that is saved in the database in auth controller line 29
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password) {
        if(!password) {
            return ''
        } 
        try {
        return crypto
        // creates a hashed version with salt and the password 
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex') 
        } 
        catch (err) {
            return ''
        }
    } 
}

module.exports = mongoose.model('User', userSchema)