import React from "react";

const StatCard = ({ title, value, description, color }) => {
  return (
    <div className="stat-card" style={{ borderColor: color }}>
      <h3>{title}</h3>
      <p className="value">{value}</p>
      <p className="description">{description}</p>
    </div>
  );
};

export default StatCard;
