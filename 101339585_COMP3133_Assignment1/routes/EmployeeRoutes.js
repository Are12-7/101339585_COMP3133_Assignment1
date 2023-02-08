// Carlos Arellano - 101339585
const express = require('express');
const router = express.Router();
const employeeModel = require('../models/Employee');

// Getting all employees
router.get('/', async (req, res) => {
    try {
        const employees = await employeeModel.find({});
        res.status(200).send(employees);
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router