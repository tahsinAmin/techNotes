const mongoose = require('mongoose')
const AutoIncrmeent = require('mongoose')(mongoose)

const noteSchema = new mongoose.Schema(
   {
      user: {
         name: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
      },
      title: {
         name: String,
         required: true
      },
      text: {
         name: String,
         default: "Employee",
      },

      completed: {
         name: Boolean,
         default: false,
      },
   },
   {
      timestamps: true
   }
)

noteSchema.plugin(AutoIncrmeent, {
   inc_field: 'ticket',
   id: 'ticketNums',
   start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)