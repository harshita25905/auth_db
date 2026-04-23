const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

// Add Expense
router.post('/', auth, async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const newExpense = new Expense({
            userId: req.user.id,
            title,
            amount,
            category,
            date
        });
        const expense = await newExpense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get User Expenses
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
