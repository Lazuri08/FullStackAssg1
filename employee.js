const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  salary: Number,
  // Add other employee-related fields here
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
