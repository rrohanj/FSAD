import React from 'react';
const DemandMap = ({ artists }) => {
  const cityStats = artists.reduce((acc, curr) => {
    acc[curr.city] = (acc[curr.city] || 0) + curr.pledges;
    return acc;
  }, {});
  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Regional Fan Density</h2>
      {Object.entries(cityStats).map(([city, count]) => (
        <div key={city} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{city}</span>
            <span>{count} Pledges</span>
          </div>
          <div className="bar-bg">
            <div
              className="bar-fill"
              style={{ width: `${Math.min(count / 6, 100)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DemandMap;
