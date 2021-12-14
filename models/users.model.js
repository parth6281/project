const mongoose = require('mongoose')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const UsersSchema = require('./users')

class UserModel {

    static async getProfile(userId) {
        try {
            const user = await new UsersSchema().users
                .findOne({
                    _id: userId,
                })
            console.log(user)
            if (user) {
                return user
            }
            return null
        } catch (error) {
            console.error('Error in model getUserId!', error)
            return null
        }
    }

    static async IfUserAlreadyRegistered(email) {
        try {
            const userAlreadyExists = await new UsersSchema().users.findOne({
                email,
            })

            if (userAlreadyExists) {
                return true
            }
            return false
        } catch (error) {
            console.error('Error in model IfUserAlreadyRegistered!', error)
            return true
        }
    }

    static async getUserId(email) {
        try {
            const user = await new UsersSchema().users
                .findOne({
                    email,
                })
            if (user) {
                return user
            }
            return null
        } catch (error) {
            console.error('Error in model getUserId!', error)
            return null
        }
    }

    static async registerUser(name, email, password) {
        try {
            const user = await new UsersSchema().users.create({
                name,
                email,
            })
            UserModel.setPassword(user, password);

            let u = await user.save();
            return user
        } catch (error) {
            console.error('Error in model registerUser', error)
            return null
        }
    }



    static generateJwt(user) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        return jwt.sign({
            userId: user._id,
            email: user.email,
            name: user.name,
            exp: parseInt(expiry.getTime() / 1000, 10),
        }, JWT_SECRET);
    };

    static validPassword(user, password) {
        console.log(user);
        const hash = crypto
            .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
            .toString('hex');
        return user.hash === hash;
    };

    static setPassword(user, password) {
        user.salt = crypto.randomBytes(16).toString('hex');
        user.hash = crypto
            .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
            .toString('hex');
        console.log(user);
    };

}
module.exports = UserModel
