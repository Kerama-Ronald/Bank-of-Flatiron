import React, { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('category'); // default sorting by category

  // Fetch transactions from API
  useEffect(() => {
    fetch('https://my-json-server.typicode.com/Kerama-Ronald/Bank-of-Flatiron/transcations')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.log(error));
  }, []);

  // Add new transaction
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  }

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  }

  // Filter transactions by search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort transactions
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (a[sortType] < b[sortType]) {
      return -1;
    }
    if (a[sortType] > b[sortType]) {
      return 1;
    }
    return 0;
  });

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newTransaction = {
      id: Math.floor(Math.random() * 1000), // generate a random ID for demo purposes
      description: form.description.value,
      category: form.category.value,
      amount: form.amount.value
    };
    addTransaction(newTransaction);
    form.reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <label>
          Category:
          <input type="text" name="category" />
        </label>
        <label>
          Amount:
          <input type="text" name="amount" />
        </label>
        <button type="submit">Add transaction</button>
      </form>
      <label>
        Search transactions:
        <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      </label>
      <label>
        Sort by:
        <select value={sortType} onChange={(event) => setSortType(event.target.value)}>
          <option value="category">Category</option>
          <option value="description">Description</option>
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td><button onClick={() => deleteTransaction(transaction.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
