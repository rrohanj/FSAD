import React from 'react';

const PledgeManager = ({ artistId, onUpdate }) => {
  const handlePledge = async (change) => {
    const method = change > 0 ? 'POST' : 'DELETE';
    try {
      const response = await fetch(
        `http://localhost:8080/api/artists/${artistId}/pledge`,
        {
          method: method,
        },
      );
      if (response.ok) {
        onUpdate(); // Triggers fetchArtists in App.js
      }
    } catch (err) {
      console.error('Pledge sync failed', err);
    }
  };

  return (
    <div className="card-actions">
      <button className="btn-confirm" onClick={() => handlePledge(1)}>
        Confirm Support
      </button>
      <button className="btn-withdraw" onClick={() => handlePledge(-1)}>
        Withdraw
      </button>
    </div>
  );
};

export default PledgeManager;
