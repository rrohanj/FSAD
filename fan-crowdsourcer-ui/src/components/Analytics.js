import React, { useMemo } from 'react';

const Analytics = ({ artists, theme }) => {
  const cityData = useMemo(() => {
    const data = artists.reduce((acc, artist) => {
      acc[artist.city] = (acc[artist.city] || 0) + artist.pledges;
      return acc;
    }, {});
    return Object.entries(data).sort((a, b) => b[1] - a[1]);
  }, [artists]);

  const maxPledges = Math.max(...cityData.map((d) => d[1]), 1);

  return (
    <div className="analytics-view fade-in">
      <h2>Regional Demand Analytics</h2>
      <div className="chart-container">
        {cityData.map(([city, count]) => (
          <div key={city} className="chart-row">
            <div className="chart-label">{city}</div>
            <div className="chart-bar-wrap">
              <div
                className="chart-bar-fill"
                style={{ width: `${(count / maxPledges) * 100}%` }}
              >
                <span className="bar-value">{count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
