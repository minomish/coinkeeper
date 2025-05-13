import React from 'react';
import Statistics from '../../components/Statistics/Statistics';
import './StatsPage.css';

const Stats = () => {
  return (
    <div className="stat_container">
      <h2 className="stat_h2">Статистика</h2>
      <Statistics />
    </div>
  );
};

export default Stats;
