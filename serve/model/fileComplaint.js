const mongoose = require('mongoose');

const fileComplaintSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    caseType: {
        type: String
    },
    state: { 
        type: String
    },
    complaintAgainst: {
        type: String
    },
    disputedAmount: {
        type: String
    },
    details: {
        type: String
    },
    publishDate: { 
        type: Date, 
        default: Date.now 
    }
})


const FileComplaint = mongoose.model('FileComplaint', fileComplaintSchema);
console.log(FileComplaint);
module.exports = FileComplaint;