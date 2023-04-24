import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [payee, setPayee] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      payee,
      category,
      amount,
    };
    onAddTransaction(newTransaction);
    setPayee('');
    setCategory('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="payee">Payee:</label>
        <input
          type="text"
          id="payee"
          value={payee}
          onChange={(e) => setPayee(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
