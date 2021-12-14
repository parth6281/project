const passport = require('passport');
const mongoose = require('mongoose');
const UserModel = require('../models/users.model');


const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    const output = await UserModel.IfUserAlreadyRegistered(req.body.email);
    if (output) {
        return res.json({ error: 'User already exists' });
    }

    const user = await UserModel.registerUser(req.body.name, req.body.email, req.body.password);


    const token = UserModel.generateJwt(user);
    res.status(200).json({ token });

};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(200)
            .json({ "message": "All fields required" });
    }
    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err) {
            return res
                .status(200)
                .json(err);
        }
        if (user) {
            token = UserModel.generateJwt(user);
            res
                .status(200)
                .json({ token });
        } else {
            res
                .status(200)
                .json(info);
        }

    })(req, res);
};

module.exports = {
    register,
    login
};