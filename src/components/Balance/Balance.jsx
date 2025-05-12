import React from 'react';
import './Balance.css';

const Balance = ({ balance = 314.86, change = -24, stats }) => {
  const today = new Date().toLocaleDateString();

  return (
    <div className="balance-card">
      <div className="balance-header">
        <h2>Balance</h2>
        <p className="balance-date">{today}</p>
      </div>

      <div className="balance-amount">
        <h1>${balance}</h1>
        <p className={`balance-change ${change < 0 ? 'negative' : 'positive'}`}>
          {change}% Compared to last week
        </p>
      </div>

      <div className="card-details">
        <div className="card-number">**** **** 9894 4958</div>
        <div className="card-holder">Shin Ryujin</div>
        <div className="card-expiry">
          <span>EXP DATE</span>
          <span>09/24</span>
        </div>
        <div className="card-cw">
          <span>C/W</span>
          <span>3124</span>
        </div>
      </div>

      <div className="activity-header">
        <h3>Monthly Activity</h3>
        <p className="activity-year">2022</p>
      </div>

      <div className="activity-toggle">
        <button className="toggle-btn active">Monthly</button>
        <button className="toggle-btn">Yearly</button>
        <span className="toggle-check">✔</span>
      </div>

      {/* <div className="balance-stats">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <h4>{stat.title}</h4>
            <p className={`stat-amount ${stat.value < 0 ? 'negative' : 'positive'}`}>
              ${stat.value}
            </p>
            {stat.date && <p className="stat-date">{stat.date}</p>}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Balance;
