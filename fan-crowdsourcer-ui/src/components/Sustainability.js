import React from 'react';
const SustainabilityBadge = ({ score }) => (
  <div className="eco-badge" title="Vendor Sustainability Score">
    🌱 {score}%
  </div>
);
export default SustainabilityBadge;
