// Carlos Arellano - 101339585
const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    salary: {
        type: Number
    }
})

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;