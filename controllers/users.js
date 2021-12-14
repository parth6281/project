const UserModel = require('../models/users.model');

const getProfile = async (req, res) => {
    try {
        if (!req.params.userId) {
            return res.sendError(
                new Exception(
                    "MissingParameter",
                    "Parameters missing: " + 'userId'
                )
            );
        }
        const user = await UserModel.getProfile(req.params.userId);
        res.json(user);
    }
    catch (err) {
        console.log(err)
        res.json({});
    }
}

const contact = (req, res) => {



    res.json({ message: 'OK' })
}

const contactUs = (req, res) => {
    console.log(req.query)
    console.log(req.query);
    const { name, email, phone, message, _id } = req.query;

    const send = require('gmail-send')({
        user: 'meetpatel4197@gmail.com',
        pass: 'meetmeet12@',
        to: 'meetpatel4197@gmail.com',
        subject: `Contacted From ${name}`,
    });

    let body = `<h1>Contact Form Details</h1>`;
    body += `<table>`;
    body += `<tr><td>User Id</td><td>${_id}</td>`;
    body += `<tr><td>Name</td><td>${name}</td>`;
    body += `<tr><td>Email</td><td>${email}</td>`;
    body += `<tr><td>Phone No.</td><td>${phone}</td>`;
    body += `<tr><td>Message</td><td>${message}</td>`;

    send({
        html: body,
    }, (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
    })
    res.json({ message: 'OK' })
}

module.exports = {
    getProfile,
    contact,
    contactUs
}