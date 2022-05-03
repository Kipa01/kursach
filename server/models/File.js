const { model, Schema } = require('mongoose')

const File = new Schema({
	name: { type: String, required: true },
	author: { type: String, required: true },
	desc: { type: String, required: true },
	type: { type: String, required: true },
	size: { type: Number, default: 0 },
	path: { type: String, default: '' },
})

module.exports = model('File', File)