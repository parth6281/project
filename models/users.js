const mongoose = require('mongoose')
const Schema = mongoose.Schema

class Users {
  constructor() {
    try {
      this.__users = new global.Mongoose.Schema(
        {
          name: { type: String },
          email: { type: String },
          hash: { type: String },
          salt: { type: String },
          userId: { type: Schema.Types.ObjectId, default: undefined },
        },
        {
          versionKey: false,
        }
      )
      this.users = global.Mongoose.model('users', this.__users)
    } catch (error) {
      this.users = global.Mongoose.model('users')
    }
  }
}

module.exports = Users
