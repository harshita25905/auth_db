import React, { useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://auth-db-wsbe.onrender.com/api/expenses', formData);
            setFormData({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] });
            onExpenseAdded();
        } catch (err) {
            console.error('Error adding expense:', err);
            alert('Failed to add expense');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="Lunch, Rent, etc." />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Amount (₹)</label>
                <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required placeholder="0.00" />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Bills">Bills</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Date</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ height: '42px' }}>
                {loading ? 'Adding...' : <><Send size={18} /> Save</>}
            </button>
        </form>
    );
};

export default ExpenseForm;
