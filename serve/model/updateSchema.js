const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
    statement: String,
    pdfLink: String,
    externalLink: String,
    publish: Boolean,
    publishDate: { type: Date, default: Date.now } // Default to current date
  });

const Updates = mongoose.model('Updates', updateSchema);
// console.log(Grievances);
module.exports = Updates;