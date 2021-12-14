const mongoose = require('mongoose');
const Member = mongoose.model('Member');


const about = async (req, res) => {
    const members = await Member.find();
    
    res.json(members);
}

module.exports = {
    about
}
