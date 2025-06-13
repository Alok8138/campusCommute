const mongoose = require('mongoose');   

const BusPassSchema = new mongoose.Schema({
    srNo: String,
    date: String,
    regNo: Number,
    name: String,
    college: String,
    enrollmentNo: Number,
    branch: String,
    semester: Number,
    address: String,
    phoneNo: Number,
    parentsNo: Number,
    email: String,
    bloodGroup: String,
    shift: String,
    city: String,
    stand: String,
    feeAmount: Number,
    note: String  
});

module.exports = mongoose.model('BusPass', BusPassSchema);
