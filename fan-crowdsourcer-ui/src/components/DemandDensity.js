import React from 'react';
const DemandDensity = ({ artists }) => {
  const stats = artists.reduce((acc, curr) => {
    acc[curr.city] = (acc[curr.city] || 0) + curr.pledges;
    return acc;
  }, {});
  return (
    <div className="card full-page-card">
      <h2>Fan Demand Density</h2>
      {Object.entries(stats).map(([city, count]) => (
        <div key={city} className="density-row">
          <span>{city}</span>
          <div className="density-line">
            <div
              style={{
                width: `${count / 5}%`,
                height: '100%',
                background: '#6366f1',
              }}
            ></div>
          </div>
          <span>{count} Pledges</span>
        </div>
      ))}
    </div>
  );
};
export default DemandDensity;
