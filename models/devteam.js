const mongoose = require('mongoose');


const memberSchema = new mongoose.Schema({
    name: String,
    role: String,
    about: String,
    image: String
});

mongoose.model('Member', memberSchema);