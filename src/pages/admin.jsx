
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    // Fetch rentals from the server
    axios.get('/api/rentals')
      .then(response => setRentals(response.data))
      .catch(error => console.error('Error fetching rentals:', error));
  }, []);

  const handleImposeFine = (username, bookId, fineAmount) => {
    // Send a request to impose fine
    axios.post('/api/rentals/fine', { username, bookId, fineAmount })
      .then(response => {
        console.log(response.data);
        // Update the local state to reflect the fine
        setRentals(rentals.map(rental => (rental._id === response.data._id ? response.data : rental)));
      })
      .catch(error => console.error('Error imposing fine:', error));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {rentals.map(rental => (
          <li key={rental._id}>
            {rental.username} rented {rental.bookId.title} by {rental.bookId.author}
            {rental.fine > 0 && (
              <span> - Fine: ${rental.fine.toFixed(2)}</span>
            )}
            <button onClick={() => handleImposeFine(rental.username, rental.bookId._id, 1)}>Impose Fine</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;