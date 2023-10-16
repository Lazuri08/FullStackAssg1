const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// POST /api/v1/emp/employees
router.post('/employees', async (req, res) => {
  try {
    const { first_name, last_name, email, gender, salary } = req.body;

    if (!first_name || !last_name || !email || !gender || !salary) {
      return res.status(400).json({
        status: false,
        message: 'Invalid employee data. Please provide all required fields.',
      });
    }

    const employee = new Employee({ first_name, last_name, email, gender, salary });
    await employee.save();

    res.status(201).json({
      status: true,
      message: 'Employee created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Employee creation failed',
    });
  }
});

// GET /api/v1/emp/employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      status: true,
      data: employees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error while retrieving employee list',
    });
  }
});

// GET /api/v1/emp/employees/:eid
router.get('/employees/:eid', async (req, res) => {
  try {
    const employeeId = req.params.eid;
    const employeeDetails = await Employee.findById(employeeId);

    if (employeeDetails) {
      res.status(200).json({ status: true, data: employeeDetails });
    } else {
      res.status(404).json({ status: false, message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error while retrieving employee details',
    });
  }
});

// PUT /api/v1/emp/employees/:eid
router.put('/employees/:eid', async (req, res) => {
  try {
    const employeeId = req.params.eid;
    const updatedData = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedData, { new: true });

    if (updatedEmployee) {
      res.status(200).json({ status: true, message: 'Employee details updated successfully' });
    } else {
      res.status(404).json({ status: false, message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error while updating employee details',
    });
  }
});

// DELETE /api/v1/emp/employees/:eid
router.delete('/employees/:eid', async (req, res) => {
  try {
    const employeeId = req.params.eid;

    // Use the `findByIdAndRemove` method with `await`
    const deletedEmployee = await Employee.findByIdAndRemove(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});




module.exports = router;