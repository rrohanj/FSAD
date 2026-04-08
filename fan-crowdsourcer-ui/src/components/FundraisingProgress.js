import React from 'react';

const FundraisingProgress = ({ current, goal }) => {
  const percentage = Math.min(Math.round((current / goal) * 100), 100);

  return (
    <div className="progress-container">
      <div className="progress-stats">
        <span className="percent-text">{percentage}% Funded</span>
        <span className="raw-stats">
          {current} / {goal}
        </span>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FundraisingProgress;
