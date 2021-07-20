'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProyectosSchema = new Schema({
	name: { type: String },
	description: { type: String },
	category: { type: String },
	year: { type: Number},
	langs: { type: String },
	image: { type: String }
});

module.exports = mongoose.model('Proyecto', ProyectosSchema);
