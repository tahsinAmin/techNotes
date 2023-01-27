const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
   username: {
      name: String,
      required: true
   },
   password: {
      name: String,
      required: true
   },
   roles: [{
      name: String,
      default: "Employee",
   }],

   active: {
      name: Boolean,
      default: true,
   },
})

module.exports = mongoose.model('User', userSchema)
// Any new user created needs to be automatically active. 