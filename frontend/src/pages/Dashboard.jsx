import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Filter, IndianRupee, Calendar, Tag } from 'lucide-react';
import ExpenseForm from '../components/ExpenseForm';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get('https://auth-db-wsbe.onrender.com/api/expenses');
            setExpenses(res.data);
            setFilteredExpenses(res.data);
        } catch (err) {
            console.error('Error fetching expenses:', err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        if (categoryFilter === 'All') {
            setFilteredExpenses(expenses);
        } else {
            setFilteredExpenses(expenses.filter(e => e.category === categoryFilter));
        }
    }, [categoryFilter, expenses]);

    const categories = ['All', 'Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Others'];

    const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>My Expenses</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Track and manage your daily spending</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
                    <Plus size={20} /> {showForm ? 'Close' : 'Add Expense'}
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Spending</p>
                    <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>₹{totalAmount.toLocaleString()}</h2>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Filter by Category</p>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'white', borderRadius: '8px' }}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>

            {showForm && (
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <ExpenseForm onExpenseAdded={() => { fetchExpenses(); setShowForm(false); }} />
                </div>
            )}

            <div className="expense-grid">
                {filteredExpenses.map(expense => (
                    <div key={expense._id} className="expense-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <span className={`category-tag tag-${expense.category.toLowerCase()}`}>{expense.category}</span>
                            <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary)' }}>₹{expense.amount}</span>
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>{expense.title}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <Calendar size={14} />
                            {new Date(expense.date).toLocaleDateString()}
                        </div>
                    </div>
                ))}
                {filteredExpenses.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No expenses found for this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
