const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
    complaintCategory: {
        type: String
    },
    complaintType: {
        type: String
    },
    name: {
        type: String
    },
    fatherName: {
        type: String
    },
    email: {
        type: String
    },
    countryCode: {
        type: String
    },
    phone: {
        type: Number
    },
    alternatePhone: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    state: { 
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: String
    },
    disputedAmount: {
        type: String
    },
    complaint: {
        type: String
    },
    complaintNumber: {
        type: String
    },
    status: {
        type: String
    },
    attachment: {
        type: String
    },
    originalFileName: {
        type: String
    }
})


const Grievances = mongoose.model('Grievances', grievanceSchema);
console.log(Grievances);
module.exports = Grievances;