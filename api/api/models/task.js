const mongoose = require('mongoose')

/**
* @type {mongoose.SchemaDefinitionProperty}
*/
const taskSchema = mongoose.Schema({
    name: { type: String, required: true },
    body: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }


})

module.exports = mongoose.model('Task', taskSchema)