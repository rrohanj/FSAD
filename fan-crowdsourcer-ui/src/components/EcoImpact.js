import React from 'react';
const EcoImpact = ({ artists }) => (
  <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
    <h2>Sustainability Tracker</h2>
    {artists.map((a) => (
      <div
        key={a.id}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '15px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span>{a.name}</span>
        <span style={{ color: '#22c55e' }}>Score: {a.eco}%</span>
      </div>
    ))}
  </div>
);
export default EcoImpact;
